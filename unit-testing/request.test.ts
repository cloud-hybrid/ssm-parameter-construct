import * as Utility from "util";

describe( "Standard Library HTTPs Request Resolution(s)", () => {
    it( "Resolves HTTPs URL via GET Request", () => {
        import("../src/utility/request.js").then( ($) => {
            $.default.get( "https://jsonplaceholder.typicode.com/posts/1", {} ).then( ($) => {
                process.stdout.write( "[Log] HTTPs Request" + ":" + " " + Utility.inspect( $, { colors: true } ) + "\n" );
                expect( $ ).toBeTruthy();
            } );
        } );
    } );

    it( "Resolves HTTPs URL via POST Request", () => {
        import("../src/utility/request.js").then( ($) => {
            $.default.post( "https://jsonplaceholder.typicode.com/posts", JSON.stringify( {
                title: "Test-Title",
                body: "Content",
                userId: 0
            } ), {} ).then( ($) => {
                process.stdout.write( "[Log] HTTPs Request" + ":" + " " + Utility.inspect( $, { colors: true } ) + "\n" );
                expect( $ ).toBeTruthy();
            } );
        } );
    } );
} );
