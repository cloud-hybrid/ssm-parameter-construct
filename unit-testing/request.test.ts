import * as Utility from "util";

describe( "Resolve (POST)", function () {
    it("Resolves a HTTPs URL", () => {
        import("../src/remote/request.js").then(($) => {
            $.default.get("https://jsonplaceholder.typicode.com/posts/1", {}).then(($) => {
                process.stdout.write("[Log] HTTPs Request" + ":" + " " + Utility.inspect($, { colors: true }) + "\n");
                expect($).toBeTruthy();
            });
        });
    });
} );
