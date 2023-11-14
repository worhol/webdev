const  getFeedback = async (type)=>{
    const kv = await Deno.openKv();
    const count = await kv.get([`feedback${type}`]);
    return count.value ?? 0;
};

const incrementFeedback = async (type)=>{
    let counter = await getFeedback(type);
    counter++;
    await setFeedback(counter, type);
};

const setFeedback = async (count, type)=>{
    const kv = await Deno.openKv();
    await kv.set([`feedback${type}`], count);
};

export{getFeedback, incrementFeedback};