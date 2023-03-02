interface Person{
    name: string;
    age: number
}

interface Query<T> {
    (value: T): boolean;
}

type MatchQuery = Record<keyof Person, Query<string | number>>;

type MatchQuery1 = {
    [ T in keyof Person] : Query<Person[T]>
}

function query<T>(
    items: T[],
    query: MatchQuery1 // <--- replace this! 
) {
    return items.filter(item => {
        // iterate through each of the item's properties
        for (const property of Object.keys(item)) {

            // get the query for this property name
            const propertyQuery = query[property]

            // see if this property value matches the query
            if (propertyQuery && propertyQuery(item[property])) {
                return true
            }
        }

        // nothing matched so return false
        return false
    })
}

const matches = query(
    [
        { name: "Ted", age: 12 },
        { name: "Angie", age: 31 }
    ],
    {
        name: name => name === "Angie",
        age: age => age > 30
    })
