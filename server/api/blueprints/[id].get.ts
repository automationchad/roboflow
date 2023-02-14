
import { serverSupabaseUser } from "#supabase/server";
import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://nsfipxnlucvgchlkqvqw.supabase.co";
const anon_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZmlweG5sdWN2Z2NobGtxdnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NjA0MzgsImV4cCI6MTk5MDQzNjQzOH0.ieuplz2wsoohp3BSuHsm9BNNlAIWHZqGnd2kBLcpQbk";
const client = createClient(supabase_url, anon_key);

const getBlueprintById = async (uuid) => {
  const { data, error } = await client
		.from('products')
		.select('*')
		.eq('id', uuid)
		.eq('type', 'blueprint')
		.eq('active', true)
		.limit(1)
		.single();
  return data;
};

const getImages = async (id) => {
  const { data, error } = await client.storage
    .from("images")
    .list(`blueprints/${id}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (data != null) {
    return data
      .filter((o) => o.name !== ".emptyFolderPlaceholder")
      .map((o) => {
        return {
          url: `${supabase_url}/storage/v1/object/public/images/blueprints/${id}/${o.name}`,
          alt: o.name,
        };
      });
  } else {
    alert("Error loading images");
    console.log(error);
  }
};

const getFiles = async (id) => {
  const { data, error } = await client.storage
    .from("files")
    .list(`blueprints/${id}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (data != null) {
    return data
      .filter((o) => o.name !== ".emptyFolderPlaceholder")
      .map((o) => {
        return {
          url: `${supabase_url}/storage/v1/object/public/files/blueprints/${id}/${o.name}`,
          alt: o.name,
        };
      });
  } else {
    alert("Error loading images");
    console.log(error);
  }
};

export default defineEventHandler(async (event) => {
  let data = await getBlueprintById(event.context.params.id);
  data.images = await getImages(event.context.params.id);
  data.documentation = await getFiles(event.context.params.id);
  return { data };
});
