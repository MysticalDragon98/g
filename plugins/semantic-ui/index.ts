import { ok } from "assert";
import Project from "../../lib/classes/Project.class";
import insertTagLine from "../../lib/modules/fs/insertTagLine";
//* Imports

export default async function (project: Project, options: any) {
    const indexHTML = project.subPath("src/index.html");
    ok(project.type === "angular", "This plugin only works with Angular projects.");

    await insertTagLine(indexHTML, "Styles", `<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css\">`, {
        extension: "html"
    });

    await insertTagLine(indexHTML, "Scripts", `<script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js\"></script>`, {
        extension: "html"
    });
    
    await insertTagLine(indexHTML, "Scripts", `<script src=\"https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js\"></script>`, {
        extension: "html"
    });
}