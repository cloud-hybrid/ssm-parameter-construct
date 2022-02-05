import Path from "path";
import Module from "module";

import * as AWS from "@cdktf/provider-aws";

import { Construct } from "constructs";

import { App, TerraformStack, TerraformOutput, TerraformOutputConfig } from "cdktf";

import { ID } from "./utility";
import { HTTP, VCS } from "./remote/gitlab";
import { Tagging, Input, Defaults } from "./tags";
import { Credentials, Credential } from "./credentials";

const $ = Path.normalize( import.meta.url );
const Import = Module.createRequire( $ );

const Settings: typeof import("./../configuration.json") = Import( "./../configuration.json" );

class Configuration extends Construct {
    /***
     * Common tag identifiers that are propagated throughout all the resources
     * in a composed stack(s).
     *
     * @type {Tagging}
     */
    readonly identifiers: Tagging;

    /*** The Stateful Cloud Provider */
    readonly provider: AWS.AwsProvider;

    /*** Shared Credentials File Location - Defaults to "~/.aws/credentials" */
    readonly credentials: string;
    /*** Credentials Profile Alias - Defaults to "default" */
    readonly profile: string;
    /*** AWS Account Region - Derives from Initial Configuration */
    readonly region: string;

    /*** The Remote State Backend Type - A Construct Wrapper */
    readonly backend: HTTP;
    /*** The Remote State Backend - Used to Track Infrastructure State Across Team(s) & Organizations */
    readonly remote: VCS;

    constructor(scope: Construct, name: string, identifiers: Tagging, backend: HTTP, credentials: Credential = Credentials) {
        super( scope, ID( [ name, "Configuration" ].join( "-" ) ) );

        this.identifiers = identifiers;

        this.region = credentials.region;
        this.profile = credentials.profile;
        this.credentials = credentials.credentials;

        this.backend = backend;
        this.remote = backend.remote( scope );

        this.provider = new AWS.AwsProvider( scope, ID( [ name, "Configuration", "Provider" ].join( "-" ) ), {
            region: this.region,
            profile: this.profile,
            defaultTags: this.identifiers,
            sharedCredentialsFile: this.credentials
        } );

        /// Output( scope, ID( [ name, "Configuration", "Backend" ].join( "-" ) ), {
        ///     description: "Stack's State Backend",
        ///     sensitive: false,
        ///     value: this.backend.settings
        /// } );

        Output( scope, ID( [ name, "Configuration", "Profile" ].join( "-" ) ), {
            description: "Stack's Instantiated Credential's Profile",
            sensitive: false,
            value: this.profile
        } );

        /// Output( scope, ID( [ name, "Configuration", "Tags" ].join( "-" ) ), {
        ///     description: "Stack's Propagated Resource Tag(s)",
        ///     sensitive: false,
        ///     value: this.identifiers.tags
        /// } );
    }

    public static tags(input: Input) {
        return Defaults.initialize( input );
    }
}

type Inputs = typeof import("./../configuration.json");
type Initializer = (scope: Construct, name: string) => Configuration;

/***
 * Primary Application Entry-Point
 * ---
 *
 * Initializes the Deployable from Configuration + Opinionated Default(s)
 *
 * @returns {Promise<(scope: Construct) => Configuration>}
 *
 * @constructor
 *
 */
const Initialize = async () => {
    const id = Settings.vcs.id;
    const environment = Settings.environment;

    const tags = Configuration.tags( {
        tf: Settings.tf,
        cfn: Settings.cfn,
        cloud: Settings.cloud,
        service: Settings.service,
        creator: Settings.creator,
        environment: Settings.environment,
        organization: Settings.organization
    } as Input );

    /// assert.match(environment, RegExp("(Development)|(QA)|(Staging)|(UAT)|(Production)"));

    const backend = await HTTP.initialize( environment as "Development" | "QA" | "Staging" | "UAT" | "Production", id );

    return (scope: Construct, name: string) => new Configuration( scope, name, tags, backend, Credentials );
};

/***
 * Alias to CDKTF's `App` Type
 *
 * @see {@link App}
 *
 */

const Application = App;

/***
 * Alias to CDKTF's `TerraformStack` Type
 *
 * @see {@link TerraformStack}
 *
 */

const TF = TerraformStack;

const Output = (scope: Construct, id: string, input: TerraformOutputConfig) => new TerraformOutput( scope, id, input );

export type { Inputs, Initializer };

export { AWS, Application, TF, Settings, Output, ID, Initialize, Configuration, Construct};

export default Initialize;
