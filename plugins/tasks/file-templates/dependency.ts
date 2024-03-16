import { DependencyStatus } from "../../../plugins/tasks/DependencyStatus.enum";

interface Options {

}

export async function {{varCap name}}Dependency({}: Options): Promise<DependencyStatus> {
    return DependencyStatus.Fulfilled;
} 