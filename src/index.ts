import { AWS, Application, TF, Output, Construct, Configuration, ID, Initialize, Initializer } from "./configuration";

class Stack extends TF {
    configuration: Configuration;

    constructor(scope: Construct, name: string, settings: Initializer) {
        super( scope, ID( name ) );
        this.configuration = settings( this, name );

        const parameter = new AWS.ssm.SsmParameter( this, "test-ssm-parameter", {
            name: "/test/test/test/test", overwrite: true, dataType: "text", type: "String", value: "H3ll0 W0r1d"
        } );

        Output(this, ID([name, "SSM-Parameter", "ARN"].join("-")), {
            value: parameter.arn
        });
    }
}

const application = new Application( {
    skipValidation: false,
    stackTraces: true,
    outdir: "cdktf.out"
} );

const Instance = new Stack( application, "Test-Stack", await Initialize() );

application.synth();

export { TF, Stack, Instance };

export default Instance;