import FixedLayout from "@/components/Footer";

export async function generateMetadata(
    _: any,
    parent: any
): Promise<any> {
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: "About"
    }
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <FixedLayout>
            {children}
        </FixedLayout>
    );
}
