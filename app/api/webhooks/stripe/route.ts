import { db } from "@/lib/db"
import { isSigningSecretValid } from "@/lib/valid-secret"
import { SubscriptionWebhookResponse } from "@/types/lemon-squeezy"
import { NextApiResponse } from "next"
import { headers } from "next/headers"

enum LemonSqueezyWebhooksEvents {
  SubscriptionCreated = "subscription_created",
  SubscriptionUpdated = "subscription_updated",
}

export async function POST(req: Request, res: NextApiResponse) {
  const event = headers().get("x-event-name") as string
  const signature = headers().get("x-signature") as string
  const body = await req.text()

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }

  if (!signature) {
    console.error(`Signature header not found`)
    return res.status(401).send("Signature header not found")
  }

  if (!isSigningSecretValid(body, signature)) {
    console.error(`Signing secret is invalid`)
    return res.status(401).send("Unauthorized")
  }
  const bodyParsed = JSON.parse(body) as SubscriptionWebhookResponse

  if (event === LemonSqueezyWebhooksEvents.SubscriptionCreated) {
    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await db.user.update({
      where: {
        id: bodyParsed.meta.custom_data.user_id,
      },
      data: {
        stripeSubscriptionId: bodyParsed.data.id,
        stripeCustomerId: bodyParsed.data.attributes.customer_id.toString(),
        stripePriceId: bodyParsed.data.attributes.variant_id.toString(),
        stripeCurrentPeriodEnd: new Date(bodyParsed.data.attributes.renews_at),
      },
    })
  }

  // if (event.type === "invoice.payment_succeeded") {
  //   // Retrieve the subscription details from Stripe.
  //   const subscription = await stripe.subscriptions.retrieve(
  //     session.subscription as string
  //   )

  //   // Update the price id and set the new period end.
  //   await db.user.update({
  //     where: {
  //       stripeSubscriptionId: subscription.id,
  //     },
  //     data: {
  //       stripePriceId: subscription.items.data[0].price.id,
  //       stripeCurrentPeriodEnd: new Date(
  //         subscription.current_period_end * 1000
  //       ),
  //     },
  //   })
  // }

  return new Response(null, { status: 200 })
}