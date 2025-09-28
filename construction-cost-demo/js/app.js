/**
 * 建築原価管理システム - デモ版
 * GitHub Pages公開用
 * Version 1.0.0-demo
 */

// ===== デモ版制限管理 =====
class DemoManager {
    constructor() {
        this.limitations = {
            maxProjects: 3,
            maxCostItems: 10,
            daysLimit: 7,
            exportEnabled: false
        };
        
        this.initDemo();
    }
    
    initDemo() {
        // デモ開始日時を記録
        if (!localStorage.getItem('demo_started')) {
            localStorage.setItem('demo_started', new Date().toISOString());
            this.showWelcomeModal();
        }
        
        // デモ期限チェック
        if (!this.checkExpiry()) {
            this.showExpiredModal();
            return false;
        }
        
        // デモバナー表示
        this.showDemoBanner();
        return true;
    }
    
    checkExpiry() {
        const startDate = new Date(localStorage.getItem('demo_started'));
        const now = new Date();
        const daysUsed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        
        return daysUsed < this.limitations.daysLimit;
    }
    
    getDaysLeft() {
        const startDate = new Date(localStorage.getItem('demo_started'));
        const now = new Date();
        const daysUsed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        return Math.max(0, this.limitations.daysLimit - daysUsed);
    }
    
    showDemoBanner() {
        setTimeout(() => {
            if (document.getElementById('demo-banner')) return;
            
            const banner = document.createElement('div');
            banner.id = 'demo-banner';
            banner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(90deg, #ff6b6b, #ee5a24);
                color: white;
                text-align: center;
                padding: 10px;
                font-size: 14px;
                z-index: 9999;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                font-weight: 500;
            `;
            
            banner.innerHTML = `
                <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <i class="fas fa-flask"></i>
                        <strong>デモ版</strong> - 
                        工事${this.limitations.maxProjects}件まで / 
                        原価${this.limitations.maxCostItems}件まで / 
                        あと${this.getDaysLeft()}日間利用可能
                    </div>
                    <div>
                        <a href="#" onclick="demoManager.showPurchaseModal()" style="
                            background: white;
                            color: #ee5a24;
                            padding: 5px 15px;
                            border-radius: 5px;
                            text-decoration: none;
                            font-weight: bold;
                            margin-right: 10px;
                        ">
                            <i class="fas fa-shopping-cart"></i> 製品版を購入
                        </a>
                        <a href="#" onclick="demoManager.showInfoModal()" style="
                            color: white;
                            text-decoration: none;
                        ">
                            <i class="fas fa-info-circle"></i> 制限について
                        </a>
                    </div>
                </div>
            `;
            
            document.body.insertBefore(banner, document.body.firstChild);
            
            // ヘッダーの位置調整
            const header = document.querySelector('.header');
            if (header) {
                header.style.marginTop = '45px';
            }
        }, 500);
    }
    
    showWelcomeModal() {
        const modal = document.createElement('div');
        modal.id = 'welcome-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            </style>
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease-out;
            ">
                <div style="text-align: center;">
                    <div style="
                        width: 100px;
                        height: 100px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 30px;
                    ">
                        <i class="fas fa-rocket" style="font-size: 50px; color: white;"></i>
                    </div>
                    
                    <h1 style="color: #333; margin-bottom: 10px; font-size: 28px;">
                        ようこそ！デモ版へ
                    </h1>
                    
                    <p style="color: #666; margin-bottom: 30px; font-size: 16px;">
                        建築原価管理システムを7日間無料でお試しいただけます
                    </p>
                </div>
                
                <div style="
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    padding: 25px;
                    border-radius: 15px;
                    margin-bottom: 25px;
                ">
                    <h3 style="color: #333; margin-bottom: 20px; font-size: 18px;">
                        <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
                        デモ版でできること
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 10px;">
                            <i class="fas fa-project-diagram" style="color: #667eea; font-size: 24px; margin-bottom: 10px;"></i>
                            <h4 style="color: #333; margin: 10px 0 5px;">工事管理</h4>
                            <p style="color: #666; font-size: 14px; margin: 0;">3件まで登録可能</p>
                        </div>
                        
                        <div style="background: white; padding: 15px; border-radius: 10px;">
                            <i class="fas fa-calculator" style="color: #667eea; font-size: 24px; margin-bottom: 10px;"></i>
                            <h4 style="color: #333; margin: 10px 0 5px;">原価入力</h4>
                            <p style="color: #666; font-size: 14px; margin: 0;">10件まで登録可能</p>
                        </div>
                        
                        <div style="background: white; padding: 15px; border-radius: 10px;">
                            <i class="fas fa-chart-pie" style="color: #667eea; font-size: 24px; margin-bottom: 10px;"></i>
                            <h4 style="color: #333; margin: 10px 0 5px;">グラフ分析</h4>
                            <p style="color: #666; font-size: 14px; margin: 0;">全機能利用可能</p>
                        </div>
                        
                        <div style="background: white; padding: 15px; border-radius: 10px;">
                            <i class="fas fa-save" style="color: #667eea; font-size: 24px; margin-bottom: 10px;"></i>
                            <h4 style="color: #333; margin: 10px 0 5px;">データ保存</h4>
                            <p style="color: #666; font-size: 14px; margin: 0;">7日間保持</p>
                        </div>
                    </div>
                </div>
                
                <div style="
                    background: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 25px;
                ">
                    <p style="color: #856404; margin: 0; font-size: 14px;">
                        <i class="fas fa-lightbulb"></i>
                        <strong>ヒント：</strong>実際の工事データで入力してみると、使い勝手がよく分かります！
                    </p>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="document.getElementById('welcome-modal').remove()" style="
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        padding: 15px 50px;
                        border-radius: 10px;
                        font-size: 18px;
                        cursor: pointer;
                        font-weight: bold;
                        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='translateY(-2px)'" 
                       onmouseout="this.style.transform='translateY(0)'">
                        デモを開始する
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    showExpiredModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: #e74c3c;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                ">
                    <i class="fas fa-clock" style="font-size: 40px; color: white;"></i>
                </div>
                
                <h2 style="color: #e74c3c; margin-bottom: 20px;">
                    デモ期間が終了しました
                </h2>
                
                <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                    7日間のデモ期間が終了しました。<br>
                    いかがでしたか？<br><br>
                    製品版では制限なくすべての機能をご利用いただけます。
                </p>
                
                <div style="
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    padding: 25px;
                    border-radius: 15px;
                    margin-bottom: 25px;
                ">
                    <h3 style="color: #333; margin-bottom: 15px;">
                        🎯 製品版の特典
                    </h3>
                    <ul style="text-align: left; color: #666; line-height: 1.8;">
                        <li>工事数・原価項目数 <strong>無制限</strong></li>
                        <li>CSVエクスポート機能</li>
                        <li>永久ライセンス（買い切り）</li>
                        <li>30日間メールサポート</li>
                        <li>今後のアップデート無料</li>
                    </ul>
                    
                    <div style="
                        background: white;
                        padding: 15px;
                        border-radius: 10px;
                        margin-top: 20px;
                    ">
                        <p style="color: #e74c3c; font-size: 24px; font-weight: bold; margin: 0;">
                            特別価格：5,000円
                        </p>
                        <p style="color: #999; font-size: 14px; margin: 5px 0 0;">
                            （通常8,000円）
                        </p>
                    </div>
                </div>
                
                <a href="https://note.com/あなたのアカウント/n/xxxxxx" target="_blank" style="
                    display: inline-block;
                    background: linear-gradient(135deg, #4CAF50, #45a049);
                    color: white;
                    padding: 15px 40px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 18px;
                    box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" 
                   onmouseout="this.style.transform='translateY(0)'">
                    製品版を購入する
                </a>
                
                <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    ※ デモ版のデータは削除されています
                </p>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    showPurchaseModal() {
        const modal = document.createElement('div');
        modal.id = 'purchase-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                position: relative;
            ">
                <button onclick="document.getElementById('purchase-modal').remove()" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                ">×</button>
                
                <h2 style="color: #333; margin-bottom: 30px; text-align: center;">
                    <i class="fas fa-crown" style="color: #ffc107;"></i>
                    製品版へアップグレード
                </h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div style="
                        border: 2px solid #e0e0e0;
                        border-radius: 10px;
                        padding: 20px;
                        text-align: center;
                    ">
                        <h3 style="color: #999; margin-bottom: 15px;">デモ版</h3>
                        <ul style="text-align: left; color: #666; list-style: none; padding: 0; line-height: 2;">
                            <li>❌ 工事3件まで</li>
                            <li>❌ 原価10件まで</li>
                            <li>❌ 7日間限定</li>
                            <li>❌ エクスポート不可</li>
                            <li>❌ サポートなし</li>
                        </ul>
                        <p style="color: #999; font-size: 24px; margin-top: 20px;">
                            無料
                        </p>
                    </div>
                    
                    <div style="
                        border: 2px solid #4CAF50;
                        border-radius: 10px;
                        padding: 20px;
                        text-align: center;
                        background: linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%);
                        position: relative;
                    ">
                        <div style="
                            position: absolute;
                            top: -15px;
                            right: 20px;
                            background: #ff5252;
                            color: white;
                            padding: 5px 15px;
                            border-radius: 20px;
                            font-size: 12px;
                            font-weight: bold;
                        ">おすすめ</div>
                        
                        <h3 style="color: #4CAF50; margin-bottom: 15px;">製品版</h3>
                        <ul style="text-align: left; color: #333; list-style: none; padding: 0; line-height: 2; font-weight: 500;">
                            <li>✅ 工事数無制限</li>
                            <li>✅ 原価無制限</li>
                            <li>✅ 永久ライセンス</li>
                            <li>✅ CSVエクスポート</li>
                            <li>✅ 30日間サポート</li>
                        </ul>
                        <p style="color: #4CAF50; font-size: 24px; margin-top: 20px; font-weight: bold;">
                            5,000円
                            <span style="color: #999; font-size: 14px; text-decoration: line-through; display: block;">
                                通常8,000円
                            </span>
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="https://note.com/あなたのアカウント/n/xxxxxx" target="_blank" style="
                        display: inline-block;
                        background: linear-gradient(135deg, #4CAF50, #45a049);
                        color: white;
                        padding: 15px 50px;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        font-size: 18px;
                        box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
                    ">
                        今すぐ購入する →
                    </a>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 20px;">
                        <i class="fas fa-shield-alt" style="color: #4CAF50;"></i>
                        安全な決済・即時ダウンロード
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    showInfoModal() {
        const modal = document.createElement('div');
        modal.id = 'info-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                position: relative;
            ">
                <button onclick="document.getElementById('info-modal').remove()" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                ">×</button>
                
                <h2 style="color: #333; margin-bottom: 20px;">
                    <i class="fas fa-info-circle"></i>
                    デモ版の制限について
                </h2>
                
                <div style="
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                ">
                    <h4 style="color: #495057; margin-bottom: 15px;">現在の利用状況</h4>
                    <ul style="color: #666; line-height: 1.8;">
                        <li>工事登録: ${app ? app.projects.length : 0} / ${this.limitations.maxProjects}件</li>
                        <li>原価項目: ${app ? app.costItems.length : 0} / ${this.limitations.maxCostItems}件</li>
                        <li>残り日数: ${this.getDaysLeft()}日</li>
                    </ul>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                    デモ版では基本機能をお試しいただけますが、
                    実際の業務でご利用いただくには製品版をお求めください。
                </p>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="document.getElementById('info-modal').remove()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 10px 30px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    ">閉じる</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    checkProjectLimit() {
        if (app && app.projects.length >= this.limitations.maxProjects) {
            alert(`デモ版では工事を${this.limitations.maxProjects}件までしか登録できません。\n\n無制限に登録するには製品版をご購入ください。`);
            this.showPurchaseModal();
            return false;
        }
        return true;
    }
    
    checkCostLimit() {
        if (app && app.costItems.length >= this.limitations.maxCostItems) {
            alert(`デモ版では原価項目を${this.limitations.maxCostItems}件までしか登録できません。\n\n無制限に登録するには製品版をご購入ください。`);
            this.showPurchaseModal();
            return false;
        }
        return true;
    }
}

// デモマネージャーを初期化
const demoManager = new DemoManager();

// 以下、既存のCostManagementAppクラス（前回のコードをそのまま使用）
// ただし、saveProject と saveCost メソッドの最初に制限チェックを追加

class CostManagementApp {
    // ... 既存のコード ...
    
    saveProject(e) {
        e.preventDefault();
        
        // デモ版の制限チェック
        if (!this.editingItem && !demoManager.checkProjectLimit()) {
            return;
        }
        
        // 以下、既存の保存処理
        // ...
    }
    
    saveCost(e) {
        e.preventDefault();
        
        // デモ版の制限チェック
        if (!this.editingItem && !demoManager.checkCostLimit()) {
            return;
        }
        
        // 以下、既存の保存処理
        // ...
    }
    
    exportReport() {
        // デモ版ではエクスポート不可
        alert('エクスポート機能は製品版でのみ利用可能です。');
        demoManager.showPurchaseModal();
        return;
    }
    
    exportBackup() {
        // デモ版ではバックアップ不可
        alert('バックアップ機能は製品版でのみ利用可能です。');
        demoManager.showPurchaseModal();
        return;
    }
}

// アプリケーションの初期化
let app;
document.addEventListener('DOMContentLoaded', () => {
    // デモ版の有効期限をチェック
    if (demoManager.checkExpiry()) {
        app = new CostManagementApp();
        console.log('建築原価管理システム デモ版 v1.0.0');
    }
});
