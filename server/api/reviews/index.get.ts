import Airtable from "airtable";
const base = new Airtable({ apiKey: "keyBl2UOzLvshshLp" }).base(
  "appkU7PnQUq7lePwf"
);

const table = base("case_studies");

let case_studies = [];

const getRecords = async () => {
  const data = await table
    .select({
      view: "viwqsEntAHmvVzthi",
      sort: [{ field: "last_updated", direction: "desc" }],
    })
    .firstPage();
  const records = data.map((o) => {
    return { uuid: o.id, fields: o.fields };
  });
  return records;
};

export default defineEventHandler(async (event) => {
  const data = await getRecords();
  return { data };
});
