export default function AuthLayout({ children }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                background: 'linear-gradient(135deg, #a6009d 0%, #8b0000 100%)',
            }}
        >
            {children}
        </div>
    );
}
