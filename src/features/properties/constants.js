export const propertyKeys = {
  all: ['properties'],
  myProperties: () => [...propertyKeys.all, 'my'],
  analytics: () => [...propertyKeys.all, 'analytics'],
  detail: (id) => [...propertyKeys.all, 'detail', id],
  update: (id) => [...propertyKeys.all, 'update', id],
};
