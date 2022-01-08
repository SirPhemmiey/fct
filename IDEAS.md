### Things to note

- Application of JSend Specification: See [here](https://github.com/omniti-labs/jsend) or anything similar. It's a speficification that allows you to send API response in a consistent and reasable matter. It has three 2-3 compulsory field names.

```
    {
        status: "success",
        statusCode: 200 //this is optional though because it can be gotten from the header
        data: {
            games: []
        }
    }
```
- Some Design patterns were used (`Singleton`, `Facade`, `Strategic pattern`)

- Application of some SOLID principles were applied. For instance, `Single Responsibility Principle`, `Dependency Inversion`

- Dependency Injestion container was used

- I applied versioning because it helps us to iterate faster when the needed changes are identified in the APIs. Versioning could be by URL or using a custom request header

-  Separation of concerns and layering components: Service does not directly make database calls but instead should be moved to a controller.

- The `Repository` design pattern was used. This is evident where we have all the database calls in a file and an interface is used to interact with it from the outside