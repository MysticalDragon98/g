import { createModuleInspector } from '@olptools/inspector';
import { IMethodInspector } from '@olptools/inspector/dist/src/createMethodInspector';
import { ModuleInspectorMessage } from '@olptools/inspector/dist/src/createModuleInspector';

interface IModuleInspector {
    log: (data: ModuleInspectorMessage) => Promise<void>;
    method: (method: string) => IMethodInspector;
}

//* Loggers
