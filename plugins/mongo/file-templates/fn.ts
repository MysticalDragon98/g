import withSession from "../../../../plugins/mongo/lib/withSession";

export default async function {{var name}} () {
    return await withSession(async (session) => {
        
    }, session);
}