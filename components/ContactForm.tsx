'use client';
import { Mail, MapPin, Github, Linkedin, ChevronRight } from 'lucide-react';


export default function ContactForm() {
return (
<div className="grid lg:grid-cols-2 gap-10 items-center">
<div>
<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Let’s make something delightful</h2>
<p className="mt-3 text-zinc-700">Tell me about your idea—engineering build, identity design, or an unforgettable event.</p>
<ul className="mt-6 space-y-2 text-sm text-zinc-700">
<li className="flex items-center gap-2"><Mail className="h-4 w-4"/> vincent.hu@hucrafts.com</li>
<li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Bay Area, CA</li>
<li className="flex items-center gap-2"><Github className="h-4 w-4"/> github.com/vincexl</li>
<li className="flex items-center gap-2"><Linkedin className="h-4 w-4"/> linkedin.com/in/xiaoleih</li>
</ul>
</div>
<form onSubmit={(e)=>e.preventDefault()} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
<div className="grid sm:grid-cols-2 gap-4">
<LabelledInput label="Name" placeholder="Your name" />
<LabelledInput label="Email" placeholder="you@email.com" type="email" />
<LabelledInput label="Topic" placeholder="Engineering / Design / Event" />
<LabelledInput label="Budget" placeholder="$5k–$50k" />
<div className="sm:col-span-2">
<label className="block text-sm font-medium">Message</label>
<textarea className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300" rows={5} placeholder="Tell me about your project…" />
</div>
</div>
<button className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-black text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-300">
Send inquiry <ChevronRight className="h-4 w-4" />
</button>
</form>
</div>
);
}


function LabelledInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
return (
<label className="block text-sm font-medium">
{label}
<input {...props} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300" />
</label>
);
}