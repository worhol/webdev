
const setStore = async (count) => {
    const kv = await Deno.openKv();
    await kv.set(["store"], count);
}

const getStore = async () =>{
    const kv = await Deno.openKv();
    const count = await kv.get(["store"]);
    return count.value ?? "Nothing";
}

export { setStore, getStore };
