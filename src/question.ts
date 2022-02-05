import $ from "inquirer";

const characters = (value: any) => {
    if ( /\w/.test( value ) ) {
        return true;
    }

    return "[Error] Incorrect Input Type - Expected (String)";
};

const digit = (value: any) => {
    if ( /\d/.test( String( value ) ) ) {
        return true;
    }

    return "[Error] Incorrect Input Type - Expected (Number)";
};

const Validation = {
    characters, digit
};

type Asynchronous = (input: string | number | any) => Promise<boolean>;

/***
 * Note that the following class is meant to act only as
 * a meta definition for inheritance; it cannot be used
 * as context for a prompt.
 */

class Abstract {
    name: string;
    message: string;
    validate?: Asynchronous;

    private readonly default: Function;
    private readonly defaults?: string | null;

    constructor(name: string, message: string, defaults?: any, validation?: Function | Asynchronous) {
        this.name = name;
        this.message = message;
        this.defaults = defaults;

        (validation) && Reflect.set( this,
            "validate",
            validation
        );

        this.default = () => {
            return this.defaults;
        };
    }
}

/***
 * For validations, either create an asynchronous class
 * or elect to import the Validation object.
 *
 * @example
 * import Question, { Input, Validation } from "./question";
 *
 * const validation = async ($: any) => {
 *     const result = await new Promise( (resolve) => {
 *         setTimeout( () => resolve($), 10000 );
 *     } );
 *
 *     return Validation.digit( result );
 * };
 *
 * const Name = Input.initialize( "name", "Name", "Jacob" );
 * const Surname = Input.initialize( "surname", "Last-Name", "Sanders" );
 * const Age = Input.initialize( "age", "Age", null, validation);
 *
 * const questions = [
 *     Name,
 *     Surname,
 *     Age
 * ];
 *
 * Question.prompt( questions ).then( (answers) => {
 *     console.log( JSON.stringify( answers, null, 4 ) );
 * } );
 *
 */

class Input extends Abstract {
    private type: string = "input";

    private constructor(name: string, message: string, defaults?: string | null, validation?: Function | Asynchronous) {
        super( name, message, defaults, validation );
    }

    static initialize(name: string, message: string, defaults?: string | null, validation?: Function | Asynchronous) {
        return new Input(
            name,
            message,
            defaults,
            validation
        );
    }
}

/***
 * For validations, either create an asynchronous class
 * or elect to import the Validation object.
 *
 * @example
 * import Question, { Input, Selectable, Validation } from "./question";
 *
 * const validation = async ($: any) => {
 *     const result = await new Promise( (resolve) => {
 *         setTimeout( () => resolve($), 10000 );
 *     } );
 *
 *     return Validation.digit( result );
 * };
 *
 * const Name = Input.initialize( "name", "Name", "Jacob" );
 * const Surname = Input.initialize( "surname", "Last-Name", "Sanders" );
 * const Age = Input.initialize( "age", "Age", null, validation);
 *
 * const List = Selectable.initialize("list", "Selection", ["Test-1", "Test-2"]);
 *
 * const questions = [
 *     Name,
 *     Surname,
 *     Age,
 *
 *     List
 * ];
 *
 * Question.prompt( questions ).then( (answers) => {
 *     console.log( JSON.stringify( answers, null, 4 ) );
 * } );
 *
 */

class Selectable extends Abstract {
    private choices: string[];
    private type: string = "list";

    private constructor(name: string, message: string, array: string[], defaults?: string | null, validation?: Function | Asynchronous) {
        super( name, message, defaults, validation );

        this.choices = array;
    }

    static initialize(name: string, message: string, array: string[], defaults?: string | null, validation?: Function | Asynchronous) {
        return new Selectable(
            name,
            message,
            array,
            defaults,
            validation
        );
    }
}

class Password extends Abstract {
    private type: string = "password";
    private constructor(name: string, message: string, defaults?: string | null, validation?: Function | Asynchronous) {
        super( name, message, defaults, validation );
    }

    static initialize(name: string, message: string, defaults?: string | null, validation?: Function | Asynchronous) {
        return new Password(
            name,
            message,
            defaults,
            validation
        );
    }
}

export {
    Input,
    Password,
    Selectable,

    Validation
};

export default $;