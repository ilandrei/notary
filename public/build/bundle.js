
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Third.svelte generated by Svelte v3.55.0 */

    const { console: console_1 } = globals;
    const file$7 = "src\\Third.svelte";

    function create_fragment$7(ctx) {
    	let div4;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div3;
    	let section;
    	let div2;
    	let h1;
    	let t3;
    	let h40;
    	let t4;
    	let a0;
    	let t6;
    	let br;
    	let t7;
    	let a1;
    	let t9;
    	let t10;
    	let h41;
    	let t11;
    	let a2;
    	let t13;
    	let h42;
    	let t14;
    	let a3;
    	let t16;
    	let h43;
    	let t18;
    	let h44;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div3 = element("div");
    			section = element("section");
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Contact";
    			t3 = space();
    			h40 = element("h4");
    			t4 = text("Telefon/Whatsapp: ");
    			a0 = element("a");
    			a0.textContent = "0767 236 364";
    			t6 = text("\r\n                    (Notar);\r\n                    ");
    			br = element("br");
    			t7 = space();
    			a1 = element("a");
    			a1.textContent = "0773 806 647";
    			t9 = text(" (Secretariat)");
    			t10 = space();
    			h41 = element("h4");
    			t11 = text("Email: ");
    			a2 = element("a");
    			a2.textContent = "notariliecristian@gmail.com";
    			t13 = space();
    			h42 = element("h4");
    			t14 = text("Adresa: ");
    			a3 = element("a");
    			a3.textContent = "Strada 13 Decembrie, Nr 24, Ap 2,Mun Brasov (Langa\r\n                        statia de autobuz Onix)";
    			t16 = space();
    			h43 = element("h4");
    			h43.textContent = "Va asteptam de luni pana vineri intre orele 08:00 - 16:00";
    			t18 = space();
    			h44 = element("h4");
    			h44.textContent = "Pentru orice detalii nu ezitati sa ne contactati!";
    			attr_dev(div0, "class", "background-container svelte-1eohf31");
    			add_location(div0, file$7, 11, 4, 217);
    			attr_dev(div1, "class", "page-gradient svelte-1eohf31");
    			add_location(div1, file$7, 12, 4, 259);
    			attr_dev(h1, "class", "svelte-1eohf31");
    			add_location(h1, file$7, 16, 16, 416);
    			attr_dev(a0, "href", "tel:+40-767-23-63-64");
    			attr_dev(a0, "class", "svelte-1eohf31");
    			add_location(a0, file$7, 18, 38, 494);
    			add_location(br, file$7, 22, 20, 641);
    			attr_dev(a1, "href", "tel:+40-773-80-66-47");
    			attr_dev(a1, "class", "svelte-1eohf31");
    			add_location(a1, file$7, 23, 20, 669);
    			attr_dev(h40, "class", "svelte-1eohf31");
    			add_location(h40, file$7, 17, 16, 450);
    			attr_dev(a2, "href", "mailto: notariliecristian@gmail.com");
    			attr_dev(a2, "class", "svelte-1eohf31");
    			add_location(a2, file$7, 26, 27, 804);
    			attr_dev(h41, "class", "svelte-1eohf31");
    			add_location(h41, file$7, 25, 16, 771);
    			attr_dev(a3, "href", "https://www.google.com/maps/place/Bloc+2,+Strada+13+Decembrie+24,+Bra%C8%99ov+500199/@45.6540641,25.6032523,17z/data=!3m1!4b1!4m5!3m4!1s0x40b35b8682167e4b:0x36cf29abc12fb9ab!8m2!3d45.6540604!4d25.605441");
    			attr_dev(a3, "class", "svelte-1eohf31");
    			add_location(a3, file$7, 31, 28, 1004);
    			attr_dev(h42, "class", "svelte-1eohf31");
    			add_location(h42, file$7, 30, 16, 970);
    			attr_dev(h43, "class", "svelte-1eohf31");
    			add_location(h43, file$7, 38, 16, 1456);
    			attr_dev(h44, "class", "svelte-1eohf31");
    			add_location(h44, file$7, 41, 16, 1580);
    			attr_dev(div2, "class", "first-section-half section-half svelte-1eohf31");
    			add_location(div2, file$7, 15, 12, 353);
    			attr_dev(section, "class", "svelte-1eohf31");
    			add_location(section, file$7, 14, 8, 330);
    			attr_dev(div3, "class", "page-content svelte-1eohf31");
    			add_location(div3, file$7, 13, 4, 294);
    			attr_dev(div4, "class", "page-container svelte-1eohf31");
    			add_location(div4, file$7, 10, 0, 183);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div1);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, section);
    			append_dev(section, div2);
    			append_dev(div2, h1);
    			append_dev(div2, t3);
    			append_dev(div2, h40);
    			append_dev(h40, t4);
    			append_dev(h40, a0);
    			append_dev(h40, t6);
    			append_dev(h40, br);
    			append_dev(h40, t7);
    			append_dev(h40, a1);
    			append_dev(h40, t9);
    			append_dev(div2, t10);
    			append_dev(div2, h41);
    			append_dev(h41, t11);
    			append_dev(h41, a2);
    			append_dev(div2, t13);
    			append_dev(div2, h42);
    			append_dev(h42, t14);
    			append_dev(h42, a3);
    			append_dev(div2, t16);
    			append_dev(div2, h43);
    			append_dev(div2, t18);
    			append_dev(div2, h44);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Third', slots, []);

    	const scrollTop = () => {
    		console.log("a");
    		window.scrollTo({ top: 0, behavior: "smooth" });
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Third> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ scrollTop });
    	return [];
    }

    class Third extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Third",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* node_modules\svelte-material-icons\CheckCircle.svelte generated by Svelte v3.55.0 */

    const file$6 = "node_modules\\svelte-material-icons\\CheckCircle.svelte";

    // (16:131) {#if desc}
    function create_if_block_1$4(ctx) {
    	let desc_1;
    	let t;

    	const block = {
    		c: function create() {
    			desc_1 = svg_element("desc");
    			t = text(/*desc*/ ctx[7]);
    			add_location(desc_1, file$6, 15, 141, 499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, desc_1, anchor);
    			append_dev(desc_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*desc*/ 128) set_data_dev(t, /*desc*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(desc_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(16:131) {#if desc}",
    		ctx
    	});

    	return block;
    }

    // (16:165) {#if title}
    function create_if_block$4(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[6]);
    			add_location(title_1, file$6, 15, 176, 534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 64) set_data_dev(t, /*title*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(16:165) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let svg;
    	let if_block0_anchor;
    	let path;
    	let if_block0 = /*desc*/ ctx[7] && create_if_block_1$4(ctx);
    	let if_block1 = /*title*/ ctx[6] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			if (if_block1) if_block1.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z");
    			attr_dev(path, "fill", /*color*/ ctx[2]);
    			add_location(path, file$6, 15, 203, 561);
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			attr_dev(svg, "width", /*width*/ ctx[0]);
    			attr_dev(svg, "height", /*height*/ ctx[1]);
    			attr_dev(svg, "class", /*className*/ ctx[8]);
    			attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			add_location(svg, file$6, 15, 0, 358);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block0) if_block0.m(svg, null);
    			append_dev(svg, if_block0_anchor);
    			if (if_block1) if_block1.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*desc*/ ctx[7]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$4(ctx);
    					if_block0.c();
    					if_block0.m(svg, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*title*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					if_block1.m(svg, path);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(path, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*viewBox*/ 8) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			}

    			if (dirty & /*width*/ 1) {
    				attr_dev(svg, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 2) {
    				attr_dev(svg, "height", /*height*/ ctx[1]);
    			}

    			if (dirty & /*className*/ 256) {
    				attr_dev(svg, "class", /*className*/ ctx[8]);
    			}

    			if (dirty & /*ariaLabel*/ 16) {
    				attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			}

    			if (dirty & /*ariaHidden*/ 32) {
    				attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CheckCircle', slots, []);
    	let { size = "1em" } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = "currentColor" } = $$props;
    	let { viewBox = "0 0 24 24" } = $$props;
    	let { ariaLabel = void 0 } = $$props;
    	let { ariaHidden = void 0 } = $$props;
    	let { title = void 0 } = $$props;
    	let { desc = void 0 } = $$props;
    	let { class: className = void 0 } = $$props;

    	const writable_props = [
    		'size',
    		'width',
    		'height',
    		'color',
    		'viewBox',
    		'ariaLabel',
    		'ariaHidden',
    		'title',
    		'desc',
    		'class'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CheckCircle> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('class' in $$props) $$invalidate(8, className = $$props.class);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('className' in $$props) $$invalidate(8, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className,
    		size
    	];
    }

    class CheckCircle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			size: 9,
    			width: 0,
    			height: 1,
    			color: 2,
    			viewBox: 3,
    			ariaLabel: 4,
    			ariaHidden: 5,
    			title: 6,
    			desc: 7,
    			class: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CheckCircle",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get size() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaHidden() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaHidden(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<CheckCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<CheckCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-material-icons\Information.svelte generated by Svelte v3.55.0 */

    const file$5 = "node_modules\\svelte-material-icons\\Information.svelte";

    // (16:131) {#if desc}
    function create_if_block_1$3(ctx) {
    	let desc_1;
    	let t;

    	const block = {
    		c: function create() {
    			desc_1 = svg_element("desc");
    			t = text(/*desc*/ ctx[7]);
    			add_location(desc_1, file$5, 15, 141, 499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, desc_1, anchor);
    			append_dev(desc_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*desc*/ 128) set_data_dev(t, /*desc*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(desc_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(16:131) {#if desc}",
    		ctx
    	});

    	return block;
    }

    // (16:165) {#if title}
    function create_if_block$3(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[6]);
    			add_location(title_1, file$5, 15, 176, 534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 64) set_data_dev(t, /*title*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(16:165) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let svg;
    	let if_block0_anchor;
    	let path;
    	let if_block0 = /*desc*/ ctx[7] && create_if_block_1$3(ctx);
    	let if_block1 = /*title*/ ctx[6] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			if (if_block1) if_block1.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z");
    			attr_dev(path, "fill", /*color*/ ctx[2]);
    			add_location(path, file$5, 15, 203, 561);
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			attr_dev(svg, "width", /*width*/ ctx[0]);
    			attr_dev(svg, "height", /*height*/ ctx[1]);
    			attr_dev(svg, "class", /*className*/ ctx[8]);
    			attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			add_location(svg, file$5, 15, 0, 358);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block0) if_block0.m(svg, null);
    			append_dev(svg, if_block0_anchor);
    			if (if_block1) if_block1.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*desc*/ ctx[7]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$3(ctx);
    					if_block0.c();
    					if_block0.m(svg, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*title*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$3(ctx);
    					if_block1.c();
    					if_block1.m(svg, path);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(path, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*viewBox*/ 8) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			}

    			if (dirty & /*width*/ 1) {
    				attr_dev(svg, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 2) {
    				attr_dev(svg, "height", /*height*/ ctx[1]);
    			}

    			if (dirty & /*className*/ 256) {
    				attr_dev(svg, "class", /*className*/ ctx[8]);
    			}

    			if (dirty & /*ariaLabel*/ 16) {
    				attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			}

    			if (dirty & /*ariaHidden*/ 32) {
    				attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Information', slots, []);
    	let { size = "1em" } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = "currentColor" } = $$props;
    	let { viewBox = "0 0 24 24" } = $$props;
    	let { ariaLabel = void 0 } = $$props;
    	let { ariaHidden = void 0 } = $$props;
    	let { title = void 0 } = $$props;
    	let { desc = void 0 } = $$props;
    	let { class: className = void 0 } = $$props;

    	const writable_props = [
    		'size',
    		'width',
    		'height',
    		'color',
    		'viewBox',
    		'ariaLabel',
    		'ariaHidden',
    		'title',
    		'desc',
    		'class'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Information> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('class' in $$props) $$invalidate(8, className = $$props.class);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('className' in $$props) $$invalidate(8, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className,
    		size
    	];
    }

    class Information extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			size: 9,
    			width: 0,
    			height: 1,
    			color: 2,
    			viewBox: 3,
    			ariaLabel: 4,
    			ariaHidden: 5,
    			title: 6,
    			desc: 7,
    			class: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Information",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get size() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaHidden() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaHidden(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Second.svelte generated by Svelte v3.55.0 */
    const file$4 = "src\\Second.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (53:8) {#each services as sv}
    function create_each_block(ctx) {
    	let div2;
    	let div0;
    	let checkcircle;
    	let t0;
    	let h4;
    	let t1_value = /*sv*/ ctx[1].title + "";
    	let t1;
    	let t2;
    	let div1;
    	let t3_value = /*sv*/ ctx[1].body + "";
    	let t3;
    	let current;

    	checkcircle = new CheckCircle({
    			props: { size: "30px", color: "#b76262" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(checkcircle.$$.fragment);
    			t0 = space();
    			h4 = element("h4");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			t3 = text(t3_value);
    			attr_dev(h4, "class", "svelte-1msxiso");
    			add_location(h4, file$4, 56, 20, 2766);
    			attr_dev(div0, "class", "card-title-row svelte-1msxiso");
    			add_location(div0, file$4, 54, 16, 2651);
    			attr_dev(div1, "class", "card-body svelte-1msxiso");
    			add_location(div1, file$4, 58, 16, 2827);
    			attr_dev(div2, "class", "card svelte-1msxiso");
    			add_location(div2, file$4, 53, 12, 2615);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(checkcircle, div0, null);
    			append_dev(div0, t0);
    			append_dev(div0, h4);
    			append_dev(h4, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, t3);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkcircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkcircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(checkcircle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(53:8) {#each services as sv}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div3;
    	let div0;
    	let h1;
    	let t1;
    	let div2;
    	let t2;
    	let div1;
    	let information;
    	let t3;
    	let span;
    	let current;
    	let each_value = /*services*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	information = new Information({
    			props: { size: "24px", color: "#b76262" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Servicii";
    			t1 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			div1 = element("div");
    			create_component(information.$$.fragment);
    			t3 = space();
    			span = element("span");
    			span.textContent = "Pentru perfectarea actelor și procedurilor notariale vă așteptăm\r\n                la sediul biroului notarial sau ne puteți contacta direct pe\r\n                adresa de e-mail, WhatsApp sau telefonic și veniți direct la\r\n                semnare. Apreciem timpul dumneavoastră, iar rezolvarea rapidă și\r\n                sigură a problemelor juridice este prioritatea noastră.";
    			attr_dev(h1, "class", "svelte-1msxiso");
    			add_location(h1, file$4, 49, 8, 2506);
    			attr_dev(div0, "class", "title-container svelte-1msxiso");
    			add_location(div0, file$4, 48, 4, 2467);
    			add_location(span, file$4, 65, 12, 3047);
    			attr_dev(div1, "class", "large-card svelte-1msxiso");
    			add_location(div1, file$4, 63, 8, 2952);
    			attr_dev(div2, "class", "card-container svelte-1msxiso");
    			add_location(div2, file$4, 51, 4, 2541);
    			attr_dev(div3, "class", "page-container svelte-1msxiso");
    			add_location(div3, file$4, 47, 0, 2433);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, h1);
    			append_dev(div3, t1);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			mount_component(information, div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, span);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*services*/ 1) {
    				each_value = /*services*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div2, t2);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(information.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(information.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    			destroy_component(information);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Second', slots, []);

    	let services = [
    		{
    			title: "Contracte",
    			body: `Contract de Vânzare, Promisiune de vânzare-cumpărare (Antecontract), Contract de Schimb,
Contract de Donație, Act de Partaj, Contract de Întreținere, Contract de Ipotecă Imobiliară,
Contract de Împrumut, Contract de Închiriere, etc.`
    		},
    		{
    			title: "Succesiuni",
    			body: `Dezbatere succesiunii este o procedură necesară care poate fi soluționată în mod eficient
urmând pașii indicați și explicați în detaliu de către notarul public, care se va ocupa de
formalitățile necesare soluționării procedurii succesorale și eliberării Certificatului de
moștenitor.`
    		},
    		{
    			title: "Declaratii si procuri",
    			body: `Aceasta categorie are in componenta de la declaratii simple precum cele necesare la infiintarea societatilor pana la acorduri complexe exprimate de catre parti in forma autentica precum si procuri`
    		},
    		{
    			title: "Divorturi",
    			body: `Notarul public este abilitat, in baza art. 375 din Noul Cod Civil, sa constate divortul prin acordul sotilor si sa elibereze certificatul de divort.`
    		},
    		{
    			title: "Conventii matrimoniale",
    			body: `Deși regimul matrimonial al comunității legale de bunuri reprezintă regula în materia
raporturilor patrimoniale ale soților, legislația civilă permite ca soții sau viitorii soți să poată
opta pentru regimul comunității convenționale de bunuri sau al separației de bunuri, prin
încheierea unei convenții matrimoniale.`
    		},
    		{
    			title: "Testamente",
    			body: `Testamentul autentificat de către notarul public în forma și condițiile stabilite prin Legea
nr.36/1995 a notarilor publici și a Codului Civil va beneficia de siguranța, validitatea și
avantajele înscrisurilor autentice notariale.`
    		},
    		{
    			title: "Alte proceduri",
    			body: `Dintre procedurile notariale comune, amintim: legalizarea copiilor de pe înscrisuri, legalizarea
traducerilor și semnăturilor, eliberarea de duplicate, legalizarea specimenului de semnătură,
darea de dată certă a înscrisurilor, etc.`
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Second> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ CheckCircle, Information, services });

    	$$self.$inject_state = $$props => {
    		if ('services' in $$props) $$invalidate(0, services = $$props.services);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [services];
    }

    class Second extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Second",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* node_modules\svelte-material-icons\MenuRight.svelte generated by Svelte v3.55.0 */

    const file$3 = "node_modules\\svelte-material-icons\\MenuRight.svelte";

    // (16:131) {#if desc}
    function create_if_block_1$2(ctx) {
    	let desc_1;
    	let t;

    	const block = {
    		c: function create() {
    			desc_1 = svg_element("desc");
    			t = text(/*desc*/ ctx[7]);
    			add_location(desc_1, file$3, 15, 141, 499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, desc_1, anchor);
    			append_dev(desc_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*desc*/ 128) set_data_dev(t, /*desc*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(desc_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(16:131) {#if desc}",
    		ctx
    	});

    	return block;
    }

    // (16:165) {#if title}
    function create_if_block$2(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[6]);
    			add_location(title_1, file$3, 15, 176, 534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 64) set_data_dev(t, /*title*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(16:165) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let svg;
    	let if_block0_anchor;
    	let path;
    	let if_block0 = /*desc*/ ctx[7] && create_if_block_1$2(ctx);
    	let if_block1 = /*title*/ ctx[6] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			if (if_block1) if_block1.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M10,17L15,12L10,7V17Z");
    			attr_dev(path, "fill", /*color*/ ctx[2]);
    			add_location(path, file$3, 15, 203, 561);
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			attr_dev(svg, "width", /*width*/ ctx[0]);
    			attr_dev(svg, "height", /*height*/ ctx[1]);
    			attr_dev(svg, "class", /*className*/ ctx[8]);
    			attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			add_location(svg, file$3, 15, 0, 358);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block0) if_block0.m(svg, null);
    			append_dev(svg, if_block0_anchor);
    			if (if_block1) if_block1.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*desc*/ ctx[7]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					if_block0.m(svg, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*title*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					if_block1.m(svg, path);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(path, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*viewBox*/ 8) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			}

    			if (dirty & /*width*/ 1) {
    				attr_dev(svg, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 2) {
    				attr_dev(svg, "height", /*height*/ ctx[1]);
    			}

    			if (dirty & /*className*/ 256) {
    				attr_dev(svg, "class", /*className*/ ctx[8]);
    			}

    			if (dirty & /*ariaLabel*/ 16) {
    				attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			}

    			if (dirty & /*ariaHidden*/ 32) {
    				attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MenuRight', slots, []);
    	let { size = "1em" } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = "currentColor" } = $$props;
    	let { viewBox = "0 0 24 24" } = $$props;
    	let { ariaLabel = void 0 } = $$props;
    	let { ariaHidden = void 0 } = $$props;
    	let { title = void 0 } = $$props;
    	let { desc = void 0 } = $$props;
    	let { class: className = void 0 } = $$props;

    	const writable_props = [
    		'size',
    		'width',
    		'height',
    		'color',
    		'viewBox',
    		'ariaLabel',
    		'ariaHidden',
    		'title',
    		'desc',
    		'class'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MenuRight> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('class' in $$props) $$invalidate(8, className = $$props.class);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('className' in $$props) $$invalidate(8, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className,
    		size
    	];
    }

    class MenuRight extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			size: 9,
    			width: 0,
    			height: 1,
    			color: 2,
    			viewBox: 3,
    			ariaLabel: 4,
    			ariaHidden: 5,
    			title: 6,
    			desc: 7,
    			class: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuRight",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get size() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaHidden() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaHidden(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<MenuRight>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<MenuRight>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    /* src\First.svelte generated by Svelte v3.55.0 */

    const { window: window_1$1 } = globals;
    const file$2 = "src\\First.svelte";

    function create_fragment$2(ctx) {
    	let t0;
    	let div6;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div5;
    	let div3;
    	let img;
    	let img_src_value;
    	let t3;
    	let div2;
    	let h20;
    	let t5;
    	let h21;
    	let t7;
    	let h22;
    	let t9;
    	let hr;
    	let t10;
    	let h23;
    	let div3_transition;
    	let t12;
    	let section;
    	let h1;
    	let t14;
    	let h4;
    	let t16;
    	let div4;
    	let span0;
    	let t18;
    	let span1;
    	let menuright;
    	let t19;
    	let footer;
    	let span2;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[3]);
    	menuright = new MenuRight({ props: { size: "40px" }, $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			div6 = element("div");
    			div0 = element("div");
    			t1 = space();
    			div1 = element("div");
    			t2 = space();
    			div5 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t3 = space();
    			div2 = element("div");
    			h20 = element("h2");
    			h20.textContent = "Birou";
    			t5 = space();
    			h21 = element("h2");
    			h21.textContent = "Individual";
    			t7 = space();
    			h22 = element("h2");
    			h22.textContent = "Notarial";
    			t9 = space();
    			hr = element("hr");
    			t10 = space();
    			h23 = element("h2");
    			h23.textContent = "Ilie Cristian";
    			t12 = space();
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "O baza solida pentru nevoile dvs legale";
    			t14 = space();
    			h4 = element("h4");
    			h4.textContent = "Înțelegem nevoia de siguranță și eficiență în serviciun\r\n                notarial, iar asta ne face să oferim soluții legale sigure,\r\n                rapide și clare atât pentru dumneavoastră cât și pentru afacerea\r\n                pe care o aveți.";
    			t16 = space();
    			div4 = element("div");
    			span0 = element("span");
    			span0.textContent = "Contact";
    			t18 = space();
    			span1 = element("span");
    			create_component(menuright.$$.fragment);
    			t19 = space();
    			footer = element("footer");
    			span2 = element("span");
    			span2.textContent = "arrow_circle_down";
    			document.title = "Birou Notarial Ilie Cristian";
    			attr_dev(div0, "class", "background-container svelte-r1ct6d");
    			add_location(div0, file$2, 27, 4, 605);
    			attr_dev(div1, "class", "page-gradient svelte-r1ct6d");
    			add_location(div1, file$2, 28, 4, 647);
    			if (!src_url_equal(img.src, img_src_value = "../logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "logo");
    			attr_dev(img, "class", "big-logo svelte-r1ct6d");
    			add_location(img, file$2, 31, 12, 799);
    			attr_dev(h20, "class", "svelte-r1ct6d");
    			add_location(h20, file$2, 33, 16, 908);
    			attr_dev(h21, "class", "svelte-r1ct6d");
    			add_location(h21, file$2, 34, 16, 940);
    			attr_dev(h22, "class", "svelte-r1ct6d");
    			add_location(h22, file$2, 35, 16, 977);
    			attr_dev(hr, "class", "svelte-r1ct6d");
    			add_location(hr, file$2, 36, 16, 1012);
    			set_style(h23, "color", "black");
    			set_style(h23, "font-weight", "400");
    			attr_dev(h23, "class", "svelte-r1ct6d");
    			add_location(h23, file$2, 37, 16, 1036);
    			attr_dev(div2, "class", "title-text svelte-r1ct6d");
    			add_location(div2, file$2, 32, 12, 866);
    			attr_dev(div3, "class", "title-row svelte-r1ct6d");
    			add_location(div3, file$2, 30, 8, 718);
    			attr_dev(h1, "class", "smaller-width-header svelte-r1ct6d");
    			add_location(h1, file$2, 41, 12, 1182);
    			attr_dev(h4, "class", "svelte-r1ct6d");
    			add_location(h4, file$2, 44, 12, 1305);
    			add_location(span0, file$2, 52, 16, 1753);
    			attr_dev(span1, "class", "right-arrow svelte-r1ct6d");
    			add_location(span1, file$2, 53, 16, 1793);
    			attr_dev(div4, "class", "contact-button svelte-r1ct6d");
    			add_location(div4, file$2, 51, 12, 1678);
    			attr_dev(section, "class", "content svelte-r1ct6d");
    			add_location(section, file$2, 40, 8, 1143);
    			attr_dev(span2, "class", "material-symbols-outlined svelte-r1ct6d");
    			add_location(span2, file$2, 58, 12, 1994);
    			attr_dev(footer, "class", "svelte-r1ct6d");
    			add_location(footer, file$2, 56, 8, 1902);
    			attr_dev(div5, "class", "page-content svelte-r1ct6d");
    			add_location(div5, file$2, 29, 4, 682);
    			attr_dev(div6, "class", "page-container svelte-r1ct6d");
    			add_location(div6, file$2, 26, 0, 571);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			append_dev(div6, t1);
    			append_dev(div6, div1);
    			append_dev(div6, t2);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, img);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, h20);
    			append_dev(div2, t5);
    			append_dev(div2, h21);
    			append_dev(div2, t7);
    			append_dev(div2, h22);
    			append_dev(div2, t9);
    			append_dev(div2, hr);
    			append_dev(div2, t10);
    			append_dev(div2, h23);
    			append_dev(div5, t12);
    			append_dev(div5, section);
    			append_dev(section, h1);
    			append_dev(section, t14);
    			append_dev(section, h4);
    			append_dev(section, t16);
    			append_dev(section, div4);
    			append_dev(div4, span0);
    			append_dev(div4, t18);
    			append_dev(div4, span1);
    			mount_component(menuright, span1, null);
    			append_dev(div5, t19);
    			append_dev(div5, footer);
    			append_dev(footer, span2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1$1, "resize", /*onwindowresize*/ ctx[3]),
    					listen_dev(div4, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(span2, "click", /*click_handler_1*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fly, { y: 100, duration: 1000 }, true);
    				div3_transition.run(1);
    			});

    			transition_in(menuright.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fly, { y: 100, duration: 1000 }, false);
    			div3_transition.run(0);
    			transition_out(menuright.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div6);
    			if (detaching && div3_transition) div3_transition.end();
    			destroy_component(menuright);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('First', slots, []);
    	let innerHeight = 0;

    	const scroll = () => {
    		window.scrollTo({
    			top: innerHeight - 40,
    			behavior: "smooth"
    		});
    	};

    	const scrollBot = () => {
    		window.scrollTo({ top: 100000, behavior: "smooth" });
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<First> was created with unknown prop '${key}'`);
    	});

    	function onwindowresize() {
    		$$invalidate(0, innerHeight = window_1$1.innerHeight);
    	}

    	const click_handler = () => scrollBot();
    	const click_handler_1 = () => scroll();

    	$$self.$capture_state = () => ({
    		MenuRight,
    		fly,
    		innerHeight,
    		scroll,
    		scrollBot
    	});

    	$$self.$inject_state = $$props => {
    		if ('innerHeight' in $$props) $$invalidate(0, innerHeight = $$props.innerHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [innerHeight, scroll, scrollBot, onwindowresize, click_handler, click_handler_1];
    }

    class First extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "First",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* node_modules\svelte-material-icons\Menu.svelte generated by Svelte v3.55.0 */

    const file$1 = "node_modules\\svelte-material-icons\\Menu.svelte";

    // (16:131) {#if desc}
    function create_if_block_1$1(ctx) {
    	let desc_1;
    	let t;

    	const block = {
    		c: function create() {
    			desc_1 = svg_element("desc");
    			t = text(/*desc*/ ctx[7]);
    			add_location(desc_1, file$1, 15, 141, 499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, desc_1, anchor);
    			append_dev(desc_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*desc*/ 128) set_data_dev(t, /*desc*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(desc_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(16:131) {#if desc}",
    		ctx
    	});

    	return block;
    }

    // (16:165) {#if title}
    function create_if_block$1(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[6]);
    			add_location(title_1, file$1, 15, 176, 534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 64) set_data_dev(t, /*title*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(16:165) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let svg;
    	let if_block0_anchor;
    	let path;
    	let if_block0 = /*desc*/ ctx[7] && create_if_block_1$1(ctx);
    	let if_block1 = /*title*/ ctx[6] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			if (if_block1) if_block1.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z");
    			attr_dev(path, "fill", /*color*/ ctx[2]);
    			add_location(path, file$1, 15, 203, 561);
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			attr_dev(svg, "width", /*width*/ ctx[0]);
    			attr_dev(svg, "height", /*height*/ ctx[1]);
    			attr_dev(svg, "class", /*className*/ ctx[8]);
    			attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			add_location(svg, file$1, 15, 0, 358);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block0) if_block0.m(svg, null);
    			append_dev(svg, if_block0_anchor);
    			if (if_block1) if_block1.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*desc*/ ctx[7]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(svg, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*title*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(svg, path);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(path, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*viewBox*/ 8) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			}

    			if (dirty & /*width*/ 1) {
    				attr_dev(svg, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 2) {
    				attr_dev(svg, "height", /*height*/ ctx[1]);
    			}

    			if (dirty & /*className*/ 256) {
    				attr_dev(svg, "class", /*className*/ ctx[8]);
    			}

    			if (dirty & /*ariaLabel*/ 16) {
    				attr_dev(svg, "aria-label", /*ariaLabel*/ ctx[4]);
    			}

    			if (dirty & /*ariaHidden*/ 32) {
    				attr_dev(svg, "aria-hidden", /*ariaHidden*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Menu', slots, []);
    	let { size = "1em" } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = "currentColor" } = $$props;
    	let { viewBox = "0 0 24 24" } = $$props;
    	let { ariaLabel = void 0 } = $$props;
    	let { ariaHidden = void 0 } = $$props;
    	let { title = void 0 } = $$props;
    	let { desc = void 0 } = $$props;
    	let { class: className = void 0 } = $$props;

    	const writable_props = [
    		'size',
    		'width',
    		'height',
    		'color',
    		'viewBox',
    		'ariaLabel',
    		'ariaHidden',
    		'title',
    		'desc',
    		'class'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('class' in $$props) $$invalidate(8, className = $$props.class);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    		if ('ariaLabel' in $$props) $$invalidate(4, ariaLabel = $$props.ariaLabel);
    		if ('ariaHidden' in $$props) $$invalidate(5, ariaHidden = $$props.ariaHidden);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
    		if ('className' in $$props) $$invalidate(8, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		width,
    		height,
    		color,
    		viewBox,
    		ariaLabel,
    		ariaHidden,
    		title,
    		desc,
    		className,
    		size
    	];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			size: 9,
    			width: 0,
    			height: 1,
    			color: 2,
    			viewBox: 3,
    			ariaLabel: 4,
    			ariaHidden: 5,
    			title: 6,
    			desc: 7,
    			class: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get size() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaHidden() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaHidden(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.0 */

    const { window: window_1 } = globals;
    const file = "src\\App.svelte";

    // (46:3) {#if scrollY >= 200}
    function create_if_block_1(ctx) {
    	let div;
    	let h50;
    	let t1;
    	let hr;
    	let t2;
    	let h51;
    	let div_transition;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h50 = element("h5");
    			h50.textContent = "Birou individual notarial";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			h51 = element("h5");
    			h51.textContent = "Ilie Cristian";
    			attr_dev(h50, "class", "svelte-1d48h2v");
    			add_location(h50, file, 50, 5, 1114);
    			attr_dev(hr, "class", "svelte-1d48h2v");
    			add_location(hr, file, 51, 5, 1154);
    			set_style(h51, "color", "white");
    			set_style(h51, "font-weight", "200");
    			attr_dev(h51, "class", "svelte-1d48h2v");
    			add_location(h51, file, 52, 5, 1166);
    			attr_dev(div, "class", "logo-name svelte-1d48h2v");
    			add_location(div, file, 46, 4, 1027);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h50);
    			append_dev(div, t1);
    			append_dev(div, hr);
    			append_dev(div, t2);
    			append_dev(div, h51);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { y: 30, duration: 1000 }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { y: 30, duration: 1000 }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(46:3) {#if scrollY >= 200}",
    		ctx
    	});

    	return block;
    }

    // (74:0) {#if showMobileButton}
    function create_if_block(ctx) {
    	let div6;
    	let div1;
    	let div0;
    	let t1;
    	let div3;
    	let div2;
    	let t3;
    	let div5;
    	let div4;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Home";
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div2.textContent = "Servicii";
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div4.textContent = "Contact";
    			attr_dev(div0, "class", "nav-link svelte-1d48h2v");
    			add_location(div0, file, 77, 3, 2088);
    			attr_dev(div1, "class", "mobile-nav-link svelte-1d48h2v");
    			add_location(div1, file, 75, 2, 1995);
    			attr_dev(div2, "class", "nav-link svelte-1d48h2v");
    			add_location(div2, file, 81, 3, 2254);
    			attr_dev(div3, "class", "mobile-nav-link svelte-1d48h2v");
    			add_location(div3, file, 79, 2, 2161);
    			attr_dev(div4, "class", "nav-link svelte-1d48h2v");
    			add_location(div4, file, 85, 3, 2421);
    			attr_dev(div5, "class", "mobile-nav-link svelte-1d48h2v");
    			add_location(div5, file, 83, 2, 2328);
    			attr_dev(div6, "class", "mobile-nav-container svelte-1d48h2v");
    			add_location(div6, file, 74, 1, 1958);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div1);
    			append_dev(div1, div0);
    			append_dev(div6, t1);
    			append_dev(div6, div3);
    			append_dev(div3, div2);
    			append_dev(div6, t3);
    			append_dev(div6, div5);
    			append_dev(div5, div4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler_4*/ ctx[14], false, false, false),
    					listen_dev(div2, "click", /*click_handler_5*/ ctx[15], false, false, false),
    					listen_dev(div4, "click", /*click_handler_6*/ ctx[16], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(74:0) {#if showMobileButton}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div7;
    	let div6;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let t1;
    	let div4;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div5;
    	let menu;
    	let t8;
    	let t9;
    	let main;
    	let first;
    	let t10;
    	let second;
    	let t11;
    	let third;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[8]);
    	add_render_callback(/*onwindowscroll*/ ctx[9]);
    	let if_block0 = /*scrollY*/ ctx[2] >= 200 && create_if_block_1(ctx);

    	menu = new Menu({
    			props: {
    				color: /*color*/ ctx[3],
    				size: "1.4rem",
    				width: "1.4rem",
    				height: "1.4rem"
    			},
    			$$inline: true
    		});

    	let if_block1 = /*showMobileButton*/ ctx[0] && create_if_block(ctx);
    	first = new First({ props: { id: "home" }, $$inline: true });

    	second = new Second({
    			props: { id: "services" },
    			$$inline: true
    		});

    	third = new Third({ props: { id: "contact" }, $$inline: true });

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			div4 = element("div");
    			div1 = element("div");
    			div1.textContent = "Prezentare";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Servicii";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "Contact";
    			t7 = space();
    			div5 = element("div");
    			create_component(menu.$$.fragment);
    			t8 = space();
    			if (if_block1) if_block1.c();
    			t9 = space();
    			main = element("main");
    			create_component(first.$$.fragment);
    			t10 = space();
    			create_component(second.$$.fragment);
    			t11 = space();
    			create_component(third.$$.fragment);
    			if (!src_url_equal(img.src, img_src_value = "logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "unnpr-logo");
    			attr_dev(img, "height", "50px");
    			attr_dev(img, "width", "50px");
    			add_location(img, file, 43, 3, 931);
    			attr_dev(div0, "class", "logo-container svelte-1d48h2v");
    			add_location(div0, file, 42, 2, 899);
    			attr_dev(div1, "class", "nav-link svelte-1d48h2v");
    			add_location(div1, file, 58, 3, 1350);
    			attr_dev(div2, "class", "nav-link svelte-1d48h2v");
    			add_location(div2, file, 60, 3, 1481);
    			attr_dev(div3, "class", "nav-link svelte-1d48h2v");
    			add_location(div3, file, 62, 3, 1607);
    			attr_dev(div4, "class", "button-container svelte-1d48h2v");
    			add_location(div4, file, 56, 2, 1256);
    			attr_dev(div5, "class", "button-container-mobile svelte-1d48h2v");
    			add_location(div5, file, 65, 2, 1742);
    			attr_dev(div6, "class", "button-row svelte-1d48h2v");
    			add_location(div6, file, 41, 1, 872);
    			attr_dev(div7, "class", "nav-container svelte-1d48h2v");
    			add_location(div7, file, 40, 0, 843);
    			attr_dev(main, "class", "svelte-1d48h2v");
    			add_location(main, file, 89, 0, 2509);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div6, t1);
    			append_dev(div6, div4);
    			append_dev(div4, div1);
    			append_dev(div4, t3);
    			append_dev(div4, div2);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div6, t7);
    			append_dev(div6, div5);
    			mount_component(menu, div5, null);
    			insert_dev(target, t8, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(first, main, null);
    			append_dev(main, t10);
    			mount_component(second, main, null);
    			append_dev(main, t11);
    			mount_component(third, main, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "resize", /*onwindowresize*/ ctx[8]),
    					listen_dev(window_1, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[9]();
    					}),
    					listen_dev(div1, "click", /*click_handler*/ ctx[10], false, false, false),
    					listen_dev(div2, "click", /*click_handler_1*/ ctx[11], false, false, false),
    					listen_dev(div3, "click", /*click_handler_2*/ ctx[12], false, false, false),
    					listen_dev(div5, "click", /*click_handler_3*/ ctx[13], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scrollY*/ 4 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window_1.pageXOffset, /*scrollY*/ ctx[2]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (/*scrollY*/ ctx[2] >= 200) {
    				if (if_block0) {
    					if (dirty & /*scrollY*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*showMobileButton*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(t9.parentNode, t9);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(menu.$$.fragment, local);
    			transition_in(first.$$.fragment, local);
    			transition_in(second.$$.fragment, local);
    			transition_in(third.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(menu.$$.fragment, local);
    			transition_out(first.$$.fragment, local);
    			transition_out(second.$$.fragment, local);
    			transition_out(third.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			if (if_block0) if_block0.d();
    			destroy_component(menu);
    			if (detaching) detach_dev(t8);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(main);
    			destroy_component(first);
    			destroy_component(second);
    			destroy_component(third);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { size = "1em" } = $$props;
    	let height = size; // string | number
    	let color = "white"; // string
    	let showMobileButton = false;
    	let innerHeight = 0;
    	let scrollY = 0;

    	const scrollTop = () => {
    		$$invalidate(0, showMobileButton = false);
    		window.scrollTo({ top: 0, behavior: "smooth" });
    	};

    	const scroll = () => {
    		$$invalidate(0, showMobileButton = false);

    		window.scrollTo({
    			top: innerHeight - 40,
    			behavior: "smooth"
    		});
    	};

    	const scrollBot = () => {
    		$$invalidate(0, showMobileButton = false);
    		window.scrollTo({ top: 100000, behavior: "smooth" });
    	};

    	const writable_props = ['size'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function onwindowresize() {
    		$$invalidate(1, innerHeight = window_1.innerHeight);
    	}

    	function onwindowscroll() {
    		$$invalidate(2, scrollY = window_1.pageYOffset);
    	}

    	const click_handler = () => scrollTop();
    	const click_handler_1 = () => scroll();
    	const click_handler_2 = () => scrollBot();
    	const click_handler_3 = () => $$invalidate(0, showMobileButton = !showMobileButton);
    	const click_handler_4 = () => scrollTop();
    	const click_handler_5 = () => scroll();
    	const click_handler_6 = () => scrollBot();

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(7, size = $$props.size);
    	};

    	$$self.$capture_state = () => ({
    		Third,
    		Second,
    		First,
    		Menu,
    		fly,
    		size,
    		height,
    		color,
    		showMobileButton,
    		innerHeight,
    		scrollY,
    		scrollTop,
    		scroll,
    		scrollBot
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(7, size = $$props.size);
    		if ('height' in $$props) height = $$props.height;
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    		if ('showMobileButton' in $$props) $$invalidate(0, showMobileButton = $$props.showMobileButton);
    		if ('innerHeight' in $$props) $$invalidate(1, innerHeight = $$props.innerHeight);
    		if ('scrollY' in $$props) $$invalidate(2, scrollY = $$props.scrollY);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showMobileButton,
    		innerHeight,
    		scrollY,
    		color,
    		scrollTop,
    		scroll,
    		scrollBot,
    		size,
    		onwindowresize,
    		onwindowscroll,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { size: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get size() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	intro: true,
    	props: {
    		name: 'world',
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
