import * as Utility from "util";

import { Testing } from "cdktf";

import "cdktf/lib/testing/adapters/jest";

import * as Instance from "@unit-testing/local";

import { TF, Stack } from "@unit-testing/local"

/// import * as Docker from "./../.gen/providers/docker/container";

/// ==> https://cdk.tf/testing
describe( "CDKTF Application Unit-Test", () => {
    it.todo( "@Task Example ..." );

    /// console.log("[Log] Instance", Utility.inspect(Instance, { colors: true, showHidden: true, showProxy: true}));

    // All Unit tests test the synthesised terraform code, it does not create real-world resources
    /// describe( "Unit Test Assertions", () => {
    ///     it( "Should Contain Truthy Properties", () => {
    ///         expect(
    ///             Testing.synthScope( (scope) => {
    ///                 const QA = new Stack( scope, "Unit-Testing-Stack" );
    ///                 /// console.debug("[Debug] [QA] [Unit-Testing]", Utility.inspect(QA.image, { depth: 1 }));
    ///                 return (QA.image ?? null);
    ///             } )
    ///         ).toBeTruthy();
    ///
    ///         expect(
    ///             Testing.synthScope( (scope) => {
    ///                 const QA = new Stack( scope, "Unit-Testing-Stack" );
    ///                 /// console.debug("[Debug] [QA] [Unit-Testing]", Utility.inspect(QA.image, { depth: 1 }));
    ///                 return (QA.container ?? null);
    ///             } )
    ///         ).toBeTruthy();
    ///
    ///         expect(
    ///             Testing.synthScope( (scope) => {
    ///                 const QA = new Stack( scope, "Unit-Testing-Stack" );
    ///                 /// console.debug("[Debug] [QA] [Unit-Testing]", Utility.inspect(QA.provider, { depth: 1 }));
    ///                 return (QA.provider ?? null);
    ///             } )
    ///         ).toBeTruthy();
    ///     } );
    /// } );

    /// describe( "Terraform Generated Configuration", () => {
    ///     it( "Doesn't Contain Malformation(s) && := Valid State", () => {
    ///         const QA = Testing.app();
    ///         const Stack = new TF( QA, "Terraform-Configuration-Validative-Stack" );
    ///         /// console.debug("[Debug] [QA] [Unit-Testing]", Utility.inspect(Stack, { depth: 1 }));
    ///         expect( Testing.fullSynth( Stack ) ).toBeTruthy();
    ///     } );
    /// });

    /// it( "Establishes a Successful Plan", () => {
    ///     const Instance = new Stack( Application, "Unit-Testing-Stack-Instance" );
    ///     /// console.debug("[Debug] [QA] [Unit-Testing]", Utility.inspect(Instance, { depth: 1 }));
    ///     expect( Testing.fullSynth( Instance ) ).toBeTruthy();
    /// } );

    // describe( "Unit testing using snapshots", () => {
    //     it( "Tests the snapshot", () => {
    //         const app = Testing.app();
    //         const stack = new TerraformStack( app, "test" );
    //         new TestProvider( stack, "provider", {
    //             accessKey: "1"
    //         } );
    //         new TestResource( stack, "test", {
    //             name: "my-resource"
    //         } );
    //         expect( Testing.synth( stack ) ).toMatchSnapshot();
    //     } );
    //     it( "Tests a combination of resources", () => {
    //         expect(
    //             Testing.synthScope( (stack) => {
    //                 new TestDataSource( stack, "test-data-source", {
    //                     name: "foo"
    //                 } );
    //                 new TestResource( stack, "test-resource", {
    //                     name: "bar"
    //                 } );
    //             } )
    //         ).toMatchInlineSnapshot();
    //     } );
    // } );
} );
