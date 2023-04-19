import { Kafka, type Producer } from 'kafkajs'
import { prisma } from './db'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['cluster.playground.cdkt.io:9092'],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.CONDUKTOR_PLAYGROUND_USERNAME || '',
    password: process.env.CONDUKTOR_PLAYGROUND_PASSWORD || '',
  },
})

const producer: Producer = kafka.producer()

const consumer = kafka.consumer({ groupId: 'my-group' })

export const sendMessages = async (topic: string, messages: string) => {
    await producer.connect()

    await producer.send({
        topic,
        messages: [{ value: messages }],
    })

    await producer.disconnect()
}

let isConsumerRunning = false

export const runConsumer = async () => {
  if (isConsumerRunning) {
    console.log('Consumer is already running!')
    return
  }

  await consumer.connect()
  await consumer.subscribe({ topic: 'posts' })

  isConsumerRunning = true

  await Promise.race([
    await consumer.run({
      eachMessage: async ({ message }) => {
        const users = await prisma.user.findMany()

        await Promise.all(
          users.map(async user => {
            await prisma.notification.create({
              data: {
                message: message.value?.toString() || '',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                id: JSON.parse(message.value?.toString() || '').id,
                user: { connect: { id: user.id } },
                read: false,
              },
            })
          })
        )
      },
    }),
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Consumer took too much time to respond'))
      }, 10000)
    }),
  ])

  isConsumerRunning = false
}