"use client";

import { useState } from "react";
import { Search, Plus, X, Utensils, Flame, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FoodItem {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    serving: string;
}

const MOCK_FOODS: FoodItem[] = [
    { id: '1', name: 'Chicken Breast (Grilled)', calories: 165, protein: 31, carbs: 0, fats: 3.6, serving: '100g' },
    { id: '2', name: 'Brown Rice (Cooked)', calories: 111, protein: 2.6, carbs: 23, fats: 0.9, serving: '100g' },
    { id: '3', name: 'Whole Egg (Large)', calories: 78, protein: 6, carbs: 0.6, fats: 5, serving: '1 egg' },
    { id: '4', name: 'Greek Yogurt (Non-fat)', calories: 59, protein: 10, carbs: 3.6, fats: 0.4, serving: '100g' },
    { id: '5', name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, serving: '1 medium' },
    { id: '6', name: 'Broccoli (Steamed)', calories: 34, protein: 2.8, carbs: 7, fats: 0.4, serving: '100g' },
];

export default function FoodLogger({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [search, setSearch] = useState("");
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const filteredFoods = MOCK_FOODS.filter(food =>
        food.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddFood = async () => {
        if (!selectedFood) return;
        setLoading(true);
        setError(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error("User not authenticated");

            const { error: insertError } = await supabase
                .from('food_logs')
                .insert([
                    {
                        user_id: user.id,
                        food_name: selectedFood.name,
                        calories: selectedFood.calories,
                        protein: selectedFood.protein,
                        carbs: selectedFood.carbs,
                        fats: selectedFood.fats,
                        serving_size: selectedFood.serving
                    }
                ]);

            if (insertError) throw insertError;

            onClose();
            // Refresh logic would be handled by a parent component listener or state sync
        } catch (err: any) {
            console.error("Error saving food log:", err);
            setError(err.message || "Failed to save meal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-card border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black flex items-center gap-2">
                            <Utensils className="w-6 h-6 text-primary" />
                            Log Meal
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <X className="w-5 h-5 text-foreground/40" />
                        </button>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold">
                            {error}
                        </div>
                    )}

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search food database..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-background border border-border/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white placeholder:text-foreground/20"
                        />
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredFoods.map(food => (
                            <button
                                key={food.id}
                                onClick={() => setSelectedFood(food)}
                                className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border ${selectedFood?.id === food.id
                                    ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5'
                                    : 'bg-background/40 border-border/30 hover:border-primary/30 hover:bg-background/60'
                                    }`}
                            >
                                <div className="text-left">
                                    <h4 className="font-bold">{food.name}</h4>
                                    <p className="text-xs text-foreground/40 font-medium">Serving: {food.serving}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="font-bold text-primary">{food.calories} <span className="text-[10px] uppercase font-black">kcal</span></p>
                                        <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g</p>
                                    </div>
                                    <Plus className={`w-5 h-5 transition-transform ${selectedFood?.id === food.id ? 'rotate-45 text-primary' : 'text-foreground/20'}`} />
                                </div>
                            </button>
                        ))}
                    </div>

                    {selectedFood && (
                        <div className="pt-6 border-t border-border/40 space-y-4 animate-in slide-in-from-bottom-4">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-foreground/40 uppercase tracking-widest">Quantity</span>
                                <span className="text-primary">1 serving</span>
                            </div>
                            <button
                                disabled={loading}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                                onClick={handleAddFood}
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Flame className="w-5 h-5" />
                                        Add {selectedFood.calories} Calories
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
