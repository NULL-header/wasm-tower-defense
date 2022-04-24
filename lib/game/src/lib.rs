mod utils;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use web_sys::console;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => {
        let view = format_args!($($t)*).to_string();
        console::log_1(&JsValue::from(view));
    };
}

#[wasm_bindgen]
pub fn greet(canvas: &web_sys::OffscreenCanvas) {
    // pub fn greet() {
    // console_log!(canvas);
    let aa = canvas.width();
    console_log!("{}", aa);
}
