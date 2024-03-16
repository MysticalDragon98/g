import { ITaskDef } from "@olptools/taskgraph";

interface Options {

}

export const {{varCap name}}Task = {

    dependencies(options: Options) {
        return [
            //* Dependencies { dependency, args[] }
        ];
    },

    async run(options: Options) {
        //* Task code
    }

} as ITaskDef<Options>;