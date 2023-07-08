type Props = {
    title: string
    description: string
}

const Heading = ({ title, description }: Props) => {
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
    )
}

export { Heading }