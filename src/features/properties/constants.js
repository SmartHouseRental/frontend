export const propertyKeys = {
  all: ['properties'],
  myProperties: () => [...propertyKeys.all, 'my'],
  analytics: () => [...propertyKeys.all, 'analytics'],
};
