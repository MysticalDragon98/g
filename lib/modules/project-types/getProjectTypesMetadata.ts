import getProjectTypeList from "./getProjectTypeList";
import getProjectTypeMetadata from "./getProjectTypeMetadata";

export default async function getProjectTypesMetadata () {
    const projectTypes = await getProjectTypeList();
    const metadata = await Promise.all(projectTypes.map(getProjectTypeMetadata));
    return metadata;
}