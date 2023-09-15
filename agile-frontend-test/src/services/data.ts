import { faker } from '@faker-js/faker';
// Define the types for data

interface AnimalData {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

// Define a cache to store generated data
const dataCache: AnimalData[] = [];

// Function to generate a batch of data
const generateDataBatch = (batchSize: number): AnimalData[] => {
  const data: AnimalData[] = [];
  for (let index = 0; index < batchSize; index++) {
    const type = faker.animal.type();
    data.push({
      type,
      id: dataCache.length + index + 1,
      url: faker.internet.url(),
      title: (faker.animal as unknown as { [key: string]: () => string })[
        type
      ](),
      description: faker.lorem.sentences(),
      image: faker.image.urlLoremFlickr({ category: 'animals' }),
    });
  }
  return data;
};

// Define a flag to prevent concurrent data generation
let isGeneratingData = false;

// Function to populate the data asynchronously with throttling
const populateData = async (batchSize: number): Promise<AnimalData[]> => {
  if (isGeneratingData) {
    // Data is already being generated, return an empty array for now
    return [];
  }

  try {
    isGeneratingData = true;

    // Check if there's enough data in the cache
    const cacheSize = dataCache.length;
    if (cacheSize < batchSize) {
      // Generate more data to fill the cache
      const newData = generateDataBatch(batchSize - cacheSize);
      dataCache.push(...newData);
    }

    // Return the requested batch of data from the cache
    const result = dataCache.splice(0, batchSize);
    return result;
  } finally {
    isGeneratingData = false;
  }
};

export default populateData;
