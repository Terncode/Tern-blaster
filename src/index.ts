import { TernBlaster } from './audioEngine';
if (typeof window !== 'undefined') {
    const w = window as any;
    w.TernBlaster = TernBlaster;
}
