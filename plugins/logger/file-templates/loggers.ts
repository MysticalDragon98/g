import { createModuleInspector } from '@coretools/inspector';
import { IMethodInspector } from '@coretools/inspector/dist/src/createMethodInspector';
import { ModuleInspectorMessage } from '@coretools/inspector/dist/src/createModuleInspector';

interface IModuleInspector {
    log: (data: ModuleInspectorMessage) => Promise<void>;
    method: (method: string) => IMethodInspector;
}

//* Loggers
