export const profileKeys = {
    all: ['profile'],
    details: () => [...profileKeys.all, 'detail'],
    documents: () => [...profileKeys.all, 'documents'],
};
