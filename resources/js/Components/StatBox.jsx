// resources/js/Pages/Dashboard/components/StatBox.jsx
export default function StatBox({ title, value, icon, bgColor }) {
    return (
        <div className={`p-6 rounded-lg shadow-md ${bgColor} text-white flex items-center`}>
            <div className="mr-4">
                <span className={`text-3xl`}>{icon}</span>
            </div>
            <div>
                <h5 className="font-semibold">{title}</h5>
                <p className="text-xl">{value}</p>
            </div>
        </div>
    );
}
