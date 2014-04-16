/*
 * Transition shader originally from https://github.com/gre/glsl-transition
 * Modified for Design and Systems website 2014
 * http://designandsystems.de/
 *
 * Stefan Wagner @andsynchrony
 * http://andsynchrony.net/
**/

#ifdef GL_ES
precision highp float;
#endif

// General parameters
uniform sampler2D from;
uniform sampler2D to;
uniform float progress;
uniform vec2 resolution;

// Custom parameters
uniform vec2 size;
uniform float smoothness;

float rand (vec2 co)
{
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 desaturate(vec3 color, float amount)
{
	vec3 gray = vec3(dot(vec3(0.2126,0.7152,0.0722), color));
	return vec3(mix(color, gray, amount));
}

void main()
{
	vec2 p = gl_FragCoord.xy / resolution.xy;
	float r = rand(floor(size * p));
	float m = smoothstep(0.0, -smoothness, r - (progress * (1.0 + smoothness)));
	vec4 c1 = texture2D(from, vec2(p.x,p.y - m*0.05));
	c1 = vec4( desaturate(c1.rgb, clamp(3.0*progress,0.0,1.0)), c1.a);
	vec4 c2 = texture2D(to, vec2(p.x,p.y-(0.05 - m*0.05)));
	gl_FragColor = mix(c1, c2, m);
}