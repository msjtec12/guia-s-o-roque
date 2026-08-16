'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { submitPartnerLead } from '@/lib/services/data';
import { BusinessPlan } from '@/types';

interface CadastroParceiroPageProps {
  searchParams: Promise<{
    plan?: string;
    city?: string;
  }>;
}

export default function CadastroParceiroPage({ searchParams }: CadastroParceiroPageProps) {
  const resolvedParams = use(searchParams);
  const initialPlan = (resolvedParams?.plan as BusinessPlan) || 'highlight';
  const initialCity = resolvedParams?.city === 'atibaia' ? 'city-atibaia' : 'city-sao-roque';

  const [formData, setFormData] = useState({
    company_name: '',
    responsible_name: '',
    whatsapp: '',
    email: '',
    category: 'Restaurantes',
    city_id: initialCity,
    address: '',
    instagram: '',
    website: '',
    description: '',
    desired_plan: initialPlan,
    message: '',
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.company_name || !formData.responsible_name || !formData.whatsapp || !formData.email) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage('É necessário concordar em receber o contato da nossa equipe comercial.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitPartnerLead({
        company_name: formData.company_name,
        responsible_name: formData.responsible_name,
        whatsapp: formData.whatsapp,
        email: formData.email,
        category: formData.category,
        city_id: formData.city_id,
        address: formData.address,
        instagram: formData.instagram,
        website: formData.website,
        description: formData.description,
        desired_plan: formData.desired_plan,
        message: formData.message,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Ocorreu um erro ao enviar o formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-8 bg-[#FCFAF5]">
      
      {/* BREADCRUMB */}
      <Link
        href="/para-empresas"
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#52615B] hover:text-[#183A32] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Planos</span>
      </Link>

      {/* HEADER */}
      <div className="space-y-2 text-center md:text-left border-b border-[#e6dfd4] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EBDD] text-[#183A32] text-xs font-semibold border border-[#e6dfd4]">
          <Building2 className="w-3.5 h-3.5 text-[#183A32]" />
          <span>Formulário Oficial de Anunciante • Plataforma Descubra</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Cadastre sua Empresa
        </h1>
        <p className="text-sm text-[#52615B]">
          Preencha os dados abaixo para publicar ou pré-cadastrar seu estabelecimento no portal Descubra.
        </p>
      </div>

      {/* SUCCESS MODAL OR CONFIRMATION SCREEN */}
      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-10 border border-[#e6dfd4] shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F4EBDD] text-[#183A32] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#183A32]" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#26332F]">
              Cadastro recebido com sucesso!
            </h2>
            <p className="text-sm text-[#52615B] leading-relaxed">
              Obrigado pelo interesse. Recebemos os dados da sua empresa e nossa equipe comercial entrará em contato via WhatsApp.
            </p>
          </div>

          <div className="pt-4 border-t border-[#F4EBDD] flex justify-center">
            <Link
              href="/"
              className="bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Voltar para a Página Principal
            </Link>
          </div>
        </div>
      ) : (
        /* FORM */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-[#e6dfd4] shadow-md space-y-6">
          
          {errorMessage && (
            <div className="p-4 rounded-xl bg-[#722F3E]/10 text-[#722F3E] text-xs font-medium border border-[#722F3E]/30">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SELEÇÃO DA CIDADE */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Cidade de Atuação do Estabelecimento *
              </label>
              <select
                name="city_id"
                value={formData.city_id}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-semibold bg-[#FCFAF5]"
              >
                <option value="city-sao-roque">São Roque - SP (Roteiro do Vinho & Região)</option>
                <option value="city-atibaia">Atibaia - SP (Pedra Grande & Região)</option>
              </select>
            </div>

            {/* NOME DA EMPRESA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Nome da Empresa *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Ex.: Vinícola Bella Vista"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* RESPONSÁVEL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Nome do Responsável *
              </label>
              <input
                type="text"
                name="responsible_name"
                value={formData.responsible_name}
                onChange={handleChange}
                placeholder="Ex.: João Carlos"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* WHATSAPP */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                WhatsApp Comercial *
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                E-mail de Contato *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contato@suaempresa.com.br"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* CATEGORIA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Categoria Principal
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium bg-white"
              >
                <option value="Restaurantes">Restaurantes / Gastronomia</option>
                <option value="Vinícolas & Adegas">Vinícolas & Adegas</option>
                <option value="Cervejarias Artesanais">Cervejarias Artesanais</option>
                <option value="Hospedagem">Hotéis, Pousadas & Resorts</option>
                <option value="Passeios & Agências">Passeios, Aventura & Ecoturismo</option>
                <option value="Produtores Locais">Produtores Locais & Morangos</option>
                <option value="Cafés & Docerias">Cafés & Docerias</option>
                <option value="Compras & Artesanato">Compras, Flores & Empórios</option>
              </select>
            </div>

            {/* PLANO DESEJADO */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Plano Desejado
              </label>
              <select
                name="desired_plan"
                value={formData.desired_plan}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium bg-white"
              >
                <option value="free">Plano Gratuito (R$ 0)</option>
                <option value="highlight">Plano Destaque (R$ 39,90/mês)</option>
                <option value="premium">Plano Premium VIP (R$ 79,90/mês)</option>
              </select>
            </div>

            {/* ENDEREÇO */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Endereço Completo
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ex.: Rodovia Dom Pedro I / Estrada do Vinho, SP"
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* INSTAGRAM */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Instagram (@usuario)
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="exemplo.oficial"
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* WEBSITE */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://suaempresa.com.br"
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* DESCRIÇÃO */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Breve Descrição do Estabelecimento
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Conte um pouco sobre suas especialidades, ambiente e atrações..."
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

            {/* MENSAGEM */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                Observações ou Dúvidas
              </label>
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder="Alguma informação adicional que gostaria de nos contar..."
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#183A32] text-sm font-medium"
              />
            </div>

          </div>

          {/* CHECKBOX */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded text-[#183A32] focus:ring-[#183A32] accent-[#183A32]"
              />
              <span className="text-xs text-[#52615B] leading-normal">
                Concordo em receber contato sobre o cadastro da minha empresa e autorizo o envio de mensagens informativas via WhatsApp/E-mail.
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-[#F4EBDD] flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D49A3A]" />
              <span>{isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
