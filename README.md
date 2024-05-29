# Local Storage Service

[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) wrapper for CRUD operations.

This library is useful for mocking API service, when learning a frontend framework.

## Installation

```bash
$ npm install @p9m/local-storage-service --save
or
$ yarn add @p9m/local-storage-service
```

In browser:

```html
<script src="https://unpkg.com/@p9m/local-storage-service@latest"></script>

<script>
const ls = new LocalStorageService('books');
</script>
```

## Usage

```javascript

import LocalStorageService from '@p9m/local-storage-service';

// Create instance with a namespace
const ls = new LocalStorageService('contacts');

// Create a record
ls.create({name: 'Reddy'});
// {name: 'Reddy', id: '6aa43c7c-69cf-df49-c927-6ba3db8d7ac1'}

// Get a record
ls.get('6aa43c7c-69cf-df49-c927-6ba3db8d7ac1');
// {name: 'Reddy', id: '6aa43c7c-69cf-df49-c927-6ba3db8d7ac1'}

// Update a record
ls.update({name: 'John Doe', id: '6aa43c7c-69cf-df49-c927-6ba3db8d7ac1'});
// {name: 'John Doe', id: '6aa43c7c-69cf-df49-c927-6ba3db8d7ac1'}

// Get all records within namespace (eg: contacts)
ls.getAll();

// Delete a record
ls.delete('6aa43c7c-69cf-df49-c927-6ba3db8d7ac1');

// Delete all record within namespace (eg: contacts)
ls.deleteAll();

```