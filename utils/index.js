export const getNewId = (data) => {
  let newId;

  if (!data || data.length === 0) {
    newId = 1; // Start IDs from 1 if there's no data
  } else {
    // Get the highest existing ID in the array
    const lastId = data.reduce(
      (maxId, item) => Math.max(maxId, Number(item.code) || 0),
      0
    );

    newId = lastId + 1; // Increment the ID
  }
  // Return the ID as a zero-padded string of at least 3 digits
  return newId.toString().padStart(3, "0");
};

export const getNewAreaId = (zonecode, data) => {
  let newId = 1;
  if (!data || data.length === 0) {
    newId = 1; // Start IDs from 1 if there's no data
  } else {
    // Get the highest existing ID in the array
    const filteredData = data?.filter((item) => item?.zone?.code === zonecode);

    if (filteredData.length === 0) {
      newId = 1;
    } else {
      const lastId = filteredData.reduce(
        (maxId, item) => Math.max(maxId, Number(item.code.slice(-3)) || 0),
        0
      );
      newId = lastId + 1;
    }
  }

  return zonecode + newId.toString().padStart(3, "0");
};

export const getNewUserId = (areacode, userdata) => {
  if (areacode === undefined) return null;
  let newId = 1;
  if (!userdata || userdata.length === 0) {
    newId = 1; // Start IDs from 1 if there's no data
  } else {
    // Get the highest existing ID in the array
    const filteredData = userdata?.filter(
      (item) => item?.area?.code === areacode
    );

    if (filteredData.length === 0) {
      newId = 1;
    } else {
      const lastId = filteredData.reduce(
        (maxId, item) => Math.max(maxId, Number(item.code.slice(-3)) || 0),
        0
      );
      newId = lastId + 1;
    }
  }

  return areacode + newId.toString().padStart(3, "0");
};
