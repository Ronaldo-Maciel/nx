`project.json`:

```json
//...
"my-app": {
    "targets": {
        //...
        "test": {
            "executor": "@nrwl/vite:test",
            //...
            //...
            "options": {
                "config": "apps/my-app/vite.config.ts"
            }
            //...
        }
    }
}
```

```bash
nx test my-app
```

## Examples

{% tabs %}

{% tab label="Running in watch mode" %}
To run testing in watch mode, you can create a new configuration within your test target, and have watch set to true. For example:

```json
"my-app": {
    "targets": {
        //...
        "test": {
            "executor": "@nrwl/vite:test",
            //...
            //...
            "options": {
                "config": "apps/my-app/vite.config.ts"
            },
            "configurations": {
                "watch": {
                    "watch": true
                }
            }
        }
    }
}
```

And then run `nx run my-app:test:watch`.

Alternatively, you can just run the default test target with the `--watch` flag preset, like so:

```bash
nx run my-app:test --watch
```

{% /tab %}
{% tab label="Updating snapshots" %}
Whenever a test fails because of an outdated snapshot, you can tell vitest to update them with the following:

```bash
nx run my-app:test -u
```

{% /tab %}

{% /tabs %}
