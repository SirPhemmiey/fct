### Things to note

- Please see the Postman collection here: https://documenter.getpostman.com/view/3683187/UVXerd9a

- I have used the [PBF Approach](https://phauer.com/2020/package-by-feature/) for structing the project

- Application of JSend Specification: See [here](https://github.com/omniti-labs/jsend) or anything similar. It's a speficification that allows you to send API response in a consistent and reasable matter. It has three 2-3 compulsory field names.

```
    {
        status: "success",
        statusCode: 200 //this is optional though because it can be gotten from the header
        data: {
            keys: []
        }
    }
```
- Some Design patterns were used (`Singleton`, `Facade`, `Strategic pattern`)

- Application of some SOLID principles were applied. For instance, `Single Responsibility Principle`, `Dependency Inversion`

- Dependency Injestion container was used

- I applied versioning because it helps us to iterate faster when the needed changes are identified in the APIs. Versioning could be by URL or using a custom request header

- Abstraction was heavily used

- `src/services` contains the services and also the Daos (Data access object) which helps abstracts the complexity of services directly making database calls but instead an indirection (Dependency Inversion)

-  Separation of concerns and layering components: Service does not directly make database calls but instead should be moved to a controller.

- The `Repository` design pattern was used. This is evident where we have all the database calls in a file and an interface is used to interact with it from the outside

- I applied the principle and idea of LRU

### Things i would have done
- Write more tests. Both unit and integration tests
- Validation, Authentication, Authorization