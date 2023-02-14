import Airtable from "airtable";
const base = new Airtable({ apiKey: "keyBl2UOzLvshshLp" }).base(
  "appkU7PnQUq7lePwf"
);
const table = base("sprints");

export default defineEventHandler(async (event) => {
  const { data } = await table
    .select({
      view: "viwjRdvlzpCwm0OuK",
      sort: [{ field: "est_finish_date", direction: "asc" }],
    })
    .firstPage();
  return { data };
});
