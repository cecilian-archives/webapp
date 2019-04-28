import { Client, query as q } from "faunadb";
const { Create, Update, Class, Ref } = q;

export const handler = async event => {
  try {
    const request = JSON.parse(event.body);
    const { faunaRef, itemToSave } = request;
    const fauna = new Client({
      secret: process.env.FAUNA_SECRET,
    });

    const response = faunaRef
      ? await fauna.query(
          Update(Ref(Class("ArchiveItem"), faunaRef["@ref"].id), {
            data: itemToSave,
          })
        )
      : await fauna.query(Create(Class("ArchiveItem"), { data: itemToSave }));

    return {
      statusCode: 200,
      body: JSON.stringify({ response }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ response: null, error: err }),
    };
  }
};
