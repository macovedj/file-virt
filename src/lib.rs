mod bindings;

use bindings::wasi::filesystem::preopens;
use bindings::wasi::filesystem::types;
use bindings::Guest;

struct Component;

impl Guest for Component {
    /// Say hello!

    fn hello_world() -> String {
        let directories = preopens::get_directories();
        dbg!(&directories);

        "Hello, World!".to_string()
    }
}
