import Contentful from "contentful";
const client = Contentful.createClient({
  space: "yq73w84rdxyy",
  environment: "master", // defaults to 'master' if not set
  accessToken: "p_slG5p5web18gdJPyLGtrBgR5eyluyMr7aXVmUbheU",
});

export default defineEventHandler(async (event) => {
  const data = await client
    .getEntry(event.context.params.id)
    .then((entry) => entry)
    .catch(console.error);
  return { data };
});
