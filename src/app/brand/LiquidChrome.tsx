'use client';
import { useEffect, useRef } from 'react';
import './LiquidChrome.css';

const LiquidChrome = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let t = 0;

        const noise = (x: number, y: number, z: number) => {
            let p = new Array(512);
            let p_ = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,254,137,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,254];
            for (let i=0; i < 256 ; i++) p[256+i] = p[i] = p_[i];

            let X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
            x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
            let u = fade(x), v = fade(y), w = fade(z);
            let A = p[X]+Y, B = p[X+1]+Y;
            let A1 = p[A]+Z, B1 = p[A+1]+Z, A2 = p[B]+Z, B2 = p[B+1]+Z;

            return scale(lerp(w, lerp(v, lerp(u, grad(p[A1], x, y, z), grad(p[B1], x-1, y, z)),
                                         lerp(u, grad(p[A2], x, y-1, z), grad(p[B2], x-1, y-1, z))),
                                lerp(v, lerp(u, grad(p[A1+1], x, y, z-1), grad(p[B1+1], x-1, y, z-1)),
                                         lerp(u, grad(p[A2+1], x, y-1, z-1), grad(p[B2+1], x-1, y-1, z-1)))));
        }

        const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
        const lerp = (t: number, a: number, b: number) => a + t * (b - a);
        const grad = (hash: number, x: number, y: number, z: number) => {
            let h = hash & 15;
            let u = h<8 ? x : y, v = h<4 ? y : h==12||h==14 ? x : z;
            return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
        }
        const scale = (n: number) => (1 + n) / 2;

        const draw = () => {
            t += .002;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0,0,width,height);
            for(var i=0; i<width; i+=4) {
                for(var j=0; j<height; j+=4) {
                    var n = noise(i/width*1.5, j/height*1.5, t) * 255;
                    ctx.fillStyle = `rgb(${n},${n},${n})`;
                    ctx.fillRect(i,j,4,4);
                }
            }
            requestAnimationFrame(draw);
        }
        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return <canvas ref={canvasRef} className="liquid-chrome-canvas"></canvas>;
};

export default LiquidChrome;
