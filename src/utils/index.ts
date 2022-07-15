const filterTracks = (searchText: string, array: any[]) => {
  const regExp = new RegExp(searchText, 'gmi');
  return array.filter((device: any) => regExp.test(device.product.name));
};

export { filterTracks };
