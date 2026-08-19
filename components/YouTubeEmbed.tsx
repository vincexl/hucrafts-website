export default function YouTubeEmbed({ id, title }: { id: string; title: string }) {
    return (
        <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-950 shadow-xl ring-1 ring-black/5">
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
            />
        </div>
    );
}
