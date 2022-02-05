import { Settings } from "./configuration";

import Question, { Input, Selectable, Validation } from "./question";

const validation = async ($: any) => {
    const result = await new Promise( (resolve) => {
        setTimeout( () => resolve($), 10000 );
    } );

    return Validation.digit( result );
};

const Name = Input.initialize( "name", "Name", "Jacob" );
const Surname = Input.initialize( "surname", "Last-Name", "Sanders" );
const Age = Input.initialize( "age", "Age", null, validation);

const List = Selectable.initialize("list", "Selection", ["Test-1", "Test-2"]);

const questions = [
    Name,
    Surname,
    Age,

    List
];

Question.prompt( questions ).then( (answers) => {
    console.log( JSON.stringify( answers, null, 4 ) );
} );

console.log( Settings );