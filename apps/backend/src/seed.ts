import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.reviewMedia.deleteMany();
  await prisma.reviewItem.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.listItem.deleteMany();
  await prisma.list.deleteMany();
  await prisma.place.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    Array.from({ length: 10 }).map((_, index) =>
      prisma.user.create({
        data: {
          email: `user${index}@demo.dev`,
          name: faker.person.fullName(),
          handle: `user${index}`,
          trustScore: Number(faker.number.float({ min: 0.3, max: 0.9 }).toFixed(2)),
          trustTier: index % 3 === 0 ? 'established' : 'growing',
          dietPreferences: index % 2 === 0 ? ['vegetarian'] : [],
          isCreator: index % 4 === 0,
          isOwner: index === 0
        }
      })
    )
  );

  const places = await Promise.all(
    Array.from({ length: 20 }).map((_, idx) =>
      prisma.place.create({
        data: {
          name: faker.company.name(),
          geohash: faker.string.alphanumeric(12),
          latitude: faker.location.latitude({ max: 37.9, min: 37.6 }),
          longitude: faker.location.longitude({ max: -122.3, min: -122.6 }),
          address: faker.location.streetAddress(),
          city: 'San Francisco',
          country: 'USA',
          cuisineTags: ['california', faker.helpers.arrayElement(['ramen', 'coffee', 'tacos'])],
          priceLevel: faker.number.int({ min: 1, max: 4 }),
          amenities: ['wifi', 'reservations'],
          photos: [faker.image.urlPicsumPhotos({ width: 1280, height: 720 })],
          phone: faker.phone.number(),
          website: faker.internet.url(),
          averageOverall: Number(faker.number.float({ min: 3.5, max: 4.8 }).toFixed(2)),
          reviewerTrustAvg: Number(faker.number.float({ min: 0.4, max: 0.9 }).toFixed(2)),
          reviewDiversity: Number(faker.number.float({ min: 0.4, max: 0.9 }).toFixed(2)),
          consistencyScore: Number(faker.number.float({ min: 0.4, max: 0.9 }).toFixed(2)),
          mediaQualityScore: Number(faker.number.float({ min: 0.4, max: 0.9 }).toFixed(2)),
          verifiedVisitRatio: Number(faker.number.float({ min: 0.3, max: 0.8 }).toFixed(2)),
          ownerId: idx === 0 ? users[0].id : undefined
        }
      })
    )
  );

  for (const place of places) {
    const items = await Promise.all(
      Array.from({ length: 3 }).map((_, index) =>
        prisma.menuItem.create({
          data: {
            placeId: place.id,
            name: index === 0 ? 'Signature Dish' : faker.commerce.productName(),
            category: index === 0 ? 'special' : 'entree',
            price: faker.number.float({ min: 5, max: 35 }),
            allergens: ['nuts', 'gluten'].slice(0, faker.number.int({ min: 0, max: 2 })),
            isCoffeeSpecific: place.cuisineTags.includes('coffee'),
            attributes: place.cuisineTags.includes('coffee')
              ? {
                  roaster: faker.company.name(),
                  brewMethods: ['v60', 'espresso']
                }
              : undefined
          }
        })
      )
    );

    const reviewCount = 3;
    for (let i = 0; i < reviewCount; i++) {
      const reviewer = faker.helpers.arrayElement(users);
      const review = await prisma.review.create({
        data: {
          placeId: place.id,
          userId: reviewer.id,
          overall: Number(faker.number.float({ min: 3.5, max: 5 }).toFixed(1)),
          text: faker.lorem.paragraph(),
          visitType: 'dine_in',
          partySize: faker.number.int({ min: 1, max: 4 }),
          waitMinutes: faker.number.int({ min: 0, max: 30 }),
          isVerifiedVisit: faker.datatype.boolean(),
          itemsReviewed: {
            create: items.map((item) => ({
              menuItemId: item.id,
              rating: Number(faker.number.float({ min: 3, max: 5 }).toFixed(1)),
              notes: faker.lorem.sentence()
            }))
          },
          media: {
            create: [
              {
                userId: reviewer.id,
                type: 'photo',
                url: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
                width: 1200,
                height: 800,
                alt: faker.lorem.sentence()
              },
              {
                userId: reviewer.id,
                type: 'video',
                url: faker.internet.url(),
                width: 1080,
                height: 1920,
                duration: 12
              }
            ]
          }
        }
      });

      await prisma.comment.create({
        data: {
          reviewId: review.id,
          userId: reviewer.id,
          text: 'Thanks for reading!'
        }
      });
    }
  }

  const listOwner = users[1];
  const list = await prisma.list.create({
    data: {
      ownerId: listOwner.id,
      title: 'Best Bites Under $20',
      description: 'Wallet-friendly gems discovered this month',
      isCollaborative: true,
      items: {
        create: places.slice(0, 5).map((place, idx) => ({
          placeId: place.id,
          note: idx === 0 ? 'Start here for espresso bliss' : faker.lorem.sentence()
        }))
      }
    }
  });

  await prisma.report.createMany({
    data: [
      {
        entityType: 'review',
        entityId: 'fake-review-id',
        reporterId: users[2].id,
        reason: 'spam',
        details: 'Looks promotional'
      },
      {
        entityType: 'comment',
        entityId: 'fake-comment-id',
        reporterId: users[3].id,
        reason: 'harassment',
        details: 'Not friendly'
      }
    ]
  });

  await prisma.notification.create({
    data: {
      userId: listOwner.id,
      type: 'list_shared',
      payload: { listId: list.id, collaborator: users[0].name }
    }
  });

  console.log('Seeded users, places, reviews, lists, reports, and notifications.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
