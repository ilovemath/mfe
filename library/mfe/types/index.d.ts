declare module "mfe" {
    export default function MFE(opts: mfeOpts): mfeLifecycles;

    type mfeOpts = {
        vue: any;
        name: string;
    }

    type mfeLifecycles = {
        start()
        bootstrap(opts: object): Promise<any>;
        mount(opts: object): Promise<any>;
        unmount(opts: object): Promise<any>;
    }

    type SingleSpaProps = object;
}