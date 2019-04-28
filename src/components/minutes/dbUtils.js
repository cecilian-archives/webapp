export const saveArchiveItem = async (faunaRef, item) => {
  try {
    const itemToSave = {
      ...item,
      associatedDate: item.associatedDate
        ? item.associatedDate.toISOString()
        : null,
    };

    const response = await fetch("/_/functions/save-archive-item", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({ faunaRef, itemToSave }),
    });
    const json = await response.json();
    window.CECILIAN_DEBUG && console.log(json);
    return json.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
