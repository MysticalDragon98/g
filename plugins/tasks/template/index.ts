import { TaskEngine as Engine } from "@olptools/taskgraph";
import { $MONGO_URI } from "../../lib/env";
//* Imports

const taskEngine = new Engine({
    mongoUrl: $MONGO_URI,
    defs: {
        //* Tasks
    },
    deps: {
        //* Dependencies
    }
});

export const TaskEngine = {

    dependencies () {
        return taskEngine.deps;
    },

    definitions () {
        return taskEngine.defs;
    },

    async verifyDependency(dependencyName: string, args: any) {
        return await taskEngine.getDep(dependencyName).verify(args);
    },

    async getDependencyHash(dependencyName: string, args: any) {
        return await Engine.depHash(dependencyName, args);
    },

    async trigger(dependencyName: string, args: any) {
        const hash = await TaskEngine.getDependencyHash(dependencyName, args);

        return await taskEngine.verifyDependency(dependencyName, args)
    },

    async pending() {
        return await taskEngine.pendingTasks();
    },

    async create(taskDef: string, args: any) {
        if (!taskEngine.getTaskDef(taskDef)) {
            throw new Error(`Unknown taskDef: ${taskDef}`);
        }

        const task = await taskEngine.createTask(taskDef, args);

        return task;
    },

    async retryTask(taskId: string) {
        await taskEngine.executeTask(taskId);
    },

    async resetRunningTasks() {
        await taskEngine.taskModel.updateMany({ status: "running" }, { status: "pending" })
        const pendingTasks = await taskEngine.taskModel.find({ status: "pending" });
        
        for (const task of pendingTasks) {
            TaskEngine.retryTask((<any>task)._id.toString());
        }
    },

    async allTasks() {
        return await taskEngine.taskModel.find({});
    },

    async tasks(filter: any) {
        return await taskEngine.taskModel.find(filter)
    },

    async task(filter: any) {
        return await taskEngine.taskModel.findOne(filter);
    },

    async createUnique(def: string, args: any = {}) {
        const task = await TaskEngine.task({ def, args });

        if (task) return;

        return await TaskEngine.create(def, args);
    }
}